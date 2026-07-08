import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "../components/styles/FamilyTree.css";

import type {
    FamilyMember,
    FamilyTreeData,
} from "../types/FamilyTreeTypes";

import {
    connectCousins,
    connectExSpouses,
    connectParentChild,
    connectSiblings,
    connectSpouses,
    createPerson,
    createSampleTree,
    deletePerson,
    disconnectRelationship,
    exportJSON,
    getFullName,
    importJSON,
    loadTree,
    saveTree,
    searchPeople,
    sortPeople,
    updatePerson,
} from "../utils/FamilyTreeUtils";

const FamilyTree: React.FC = () => {

    //==========================================================
    // STATE
    //==========================================================

    const [tree, setTree] = useState<FamilyTreeData>({
        members: [],
    });

    const [selected, setSelected] =
        useState<FamilyMember | null>(null);

    const [search, setSearch] =
        useState("");

    const [zoom, setZoom] =
        useState(1);

    const [memberPositions, setMemberPositions] =
        useState<Record<string, { x: number; y: number }>>({});

    const [draggedMemberId, setDraggedMemberId] =
        useState<string | null>(null);

    const [relationTarget, setRelationTarget] =
        useState("");

    const [relationType, setRelationType] =
        useState<"parent" | "child" | "spouse" | "sibling" | "cousin" | "ex-spouse">(
            "parent"
        );

    const [relationEditor, setRelationEditor] =
        useState<{ memberId: string; relation: string } | null>(null);

    const [relationReplacementTarget, setRelationReplacementTarget] =
        useState("");

    const [connections, setConnections] =
        useState<{
            id: string;
            fromX: number;
            fromY: number;
            toX: number;
            toY: number;
            type: "parent" | "spouse" | "sibling" | "cousin" | "ex-spouse";
        }[]>([]);

    const [treeDimensions, setTreeDimensions] =
        useState({ width: 1200, height: 800 });

    const treeRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

    //==========================================================
    // LOAD TREE
    //==========================================================

    useEffect(() => {

        const loaded = loadTree();

        if (loaded.members.length === 0) {

            setTree(createSampleTree());

        }
        else {

            setTree(loaded);

        }

    }, []);

    //==========================================================
    // SAVE
    //==========================================================

    useEffect(() => {

        saveTree(tree);

    }, [tree]);

    //==========================================================
    // SEARCH
    //==========================================================

    const displayedMembers = useMemo(() => {
        if (search.trim() === "") return tree.members;
        return searchPeople(tree.members, search);
    }, [tree, search]);

    const getChildren = (member: FamilyMember) =>
        tree.members.filter(child => child.parents.includes(member.id));

    const getCousins = (member: FamilyMember) => {
        const parentSiblings = tree.members
            .filter(parent => member.parents.includes(parent.id))
            .flatMap(parent =>
                tree.members.filter(
                    sibling => parent.siblings.includes(sibling.id) && sibling.id !== member.id
                )
            );

        const cousins = new Map<string, FamilyMember>();

        parentSiblings.forEach(auntUncle => {
            tree.members.forEach(child => {
                if (child.parents.includes(auntUncle.id) && child.id !== member.id) {
                    cousins.set(child.id, child);
                }
            });
        });

        return Array.from(cousins.values());
    };

    const selectedRelations = useMemo(() => {
        if (!selected) return [] as {
            relation: string;
            member: FamilyMember;
            className: string;
        }[];

        const parents = tree.members
            .filter(member => selected.parents.includes(member.id))
            .map(member => ({ relation: "Parent", member, className: "relation--parent" }));

        const children = getChildren(selected)
            .map(member => ({ relation: "Child", member, className: "relation--parent" }));

        const spouses = tree.members
            .filter(member => selected.spouses.includes(member.id))
            .map(member => ({ relation: "Spouse", member, className: "relation--spouse" }));

        const exSpouses = tree.members
            .filter(member => selected.exSpouses.includes(member.id))
            .map(member => ({ relation: "Ex-Spouse", member, className: "relation--ex-spouse" }));

        const siblings = tree.members
            .filter(member => selected.siblings.includes(member.id))
            .map(member => ({ relation: "Sibling", member, className: "relation--sibling" }));

        const cousins = getCousins(selected)
            .map(member => ({ relation: "Cousin", member, className: "relation--cousin" }));

        return [...parents, ...children, ...spouses, ...exSpouses, ...siblings, ...cousins];
    }, [selected, tree]);

    //==========================================================
    // CALCULATE GENERATIONS
    //==========================================================

    const calculateLevel = (member: FamilyMember, visited = new Set<string>()): number => {
        if (visited.has(member.id)) return 0;
        visited.add(member.id);

        if (member.parents.length === 0) return 0;

        const parentLevels = member.parents
            .map(parentId => {
                const parent = tree.members.find(m => m.id === parentId);
                return parent ? calculateLevel(parent, visited) : 0;
            });

        return Math.max(...parentLevels) + 1;
    };

    const grouped = useMemo(() => {
        const map = new Map<number, FamilyMember[]>();
        displayedMembers.forEach(member => {
            const level = calculateLevel(member);
            if (!map.has(level)) map.set(level, []);
            map.get(level)!.push(member);
        });
        return map;
    }, [displayedMembers, tree]);

    useEffect(() => {
        setMemberPositions(prev => {
            const next = { ...prev };
            let changed = false;

            Array.from(grouped.entries())
                .sort(([levelA], [levelB]) => levelA - levelB)
                .forEach(([level, people]) => {
                    people.forEach((person, index) => {
                        const current = next[person.id];
                        if (!current || current.x !== index || current.y !== level) {
                            next[person.id] = { x: index, y: level };
                            changed = true;
                        }
                    });
                });

            return changed ? next : prev;
        });
    }, [grouped]);

    const handleDropOnTree = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!draggedMemberId || !treeRef.current) return;

        const rect = treeRef.current.getBoundingClientRect();
        const gridStepX = 220;
        const gridStepY = 240;
        const x = Math.max(0, Math.round((event.clientX - rect.left) / gridStepX));
        const y = Math.max(0, Math.round((event.clientY - rect.top) / gridStepY));

        setMemberPositions(prev => ({
            ...prev,
            [draggedMemberId]: { x, y },
        }));
        setDraggedMemberId(null);
    };

    useLayoutEffect(() => {
        if (!treeRef.current) return;

        const treeRect = treeRef.current.getBoundingClientRect();
        setTreeDimensions({
            width: Math.max(1200, treeRect.width),
            height: Math.max(800, treeRect.height),
        });

        const positions: Record<string, { x: number; yTop: number; yBottom: number; yCenter: number }> = {};

        Object.entries(cardRefs.current).forEach(([id, node]) => {
            if (!node) return;
            const rect = node.getBoundingClientRect();
            positions[id] = {
                x: rect.left + rect.width / 2 - treeRect.left,
                yTop: rect.top - treeRect.top,
                yBottom: rect.top + rect.height - treeRect.top,
                yCenter: rect.top + rect.height / 2 - treeRect.top,
            };
        });

        const lines: typeof connections = [];

        tree.members.forEach(member => {
            const memberPos = positions[member.id];
            if (!memberPos) return;

            member.parents.forEach(parentId => {
                const parentPos = positions[parentId];
                if (!parentPos) return;
                lines.push({
                    id: `${parentId}-${member.id}`,
                    fromX: parentPos.x,
                    fromY: parentPos.yBottom,
                    toX: memberPos.x,
                    toY: memberPos.yTop,
                    type: "parent",
                });
            });

            member.spouses.forEach(spouseId => {
                if (member.id >= spouseId) return;
                const spousePos = positions[spouseId];
                if (!spousePos) return;
                lines.push({
                    id: `${member.id}-spouse-${spouseId}`,
                    fromX: memberPos.x,
                    fromY: memberPos.yCenter,
                    toX: spousePos.x,
                    toY: spousePos.yCenter,
                    type: "spouse",
                });
            });

            member.exSpouses.forEach(spouseId => {
                if (member.id >= spouseId) return;
                const spousePos = positions[spouseId];
                if (!spousePos) return;
                lines.push({
                    id: `${member.id}-ex-spouse-${spouseId}`,
                    fromX: memberPos.x,
                    fromY: memberPos.yCenter,
                    toX: spousePos.x,
                    toY: spousePos.yCenter,
                    type: "ex-spouse",
                });
            });

            member.siblings.forEach(siblingId => {
                if (member.id >= siblingId) return;
                const siblingPos = positions[siblingId];
                if (!siblingPos) return;
                lines.push({
                    id: `${member.id}-sib-${siblingId}`,
                    fromX: memberPos.x,
                    fromY: memberPos.yCenter,
                    toX: siblingPos.x,
                    toY: siblingPos.yCenter,
                    type: "sibling",
                });
            });

            const parents = tree.members.filter(parent => member.parents.includes(parent.id));
            const auntUncles = parents.flatMap(parent =>
                tree.members.filter(a => parent.siblings.includes(a.id))
            );

            const cousinSet = new Set<string>();
            auntUncles.forEach(auntUncle => {
                tree.members.forEach(child => {
                    if (child.parents.includes(auntUncle.id) && child.id !== member.id) {
                        cousinSet.add(child.id);
                    }
                });
            });

            cousinSet.forEach(cousinId => {
                if (member.id >= cousinId) return;
                const cousinPos = positions[cousinId];
                if (!cousinPos) return;
                lines.push({
                    id: `${member.id}-cousin-${cousinId}`,
                    fromX: memberPos.x,
                    fromY: memberPos.yCenter,
                    toX: cousinPos.x,
                    toY: cousinPos.yCenter,
                    type: "cousin",
                });
            });
        });

        setConnections(lines);
    }, [tree, grouped, zoom, displayedMembers]);

    //==========================================================
    // ADD PERSON
    //==========================================================

    const handleAddPerson = () => {

        const person = createPerson();

        person.firstName = "New";
        person.lastName = "Person";

        setTree({

            members: [
                ...tree.members,
                person,
            ],

        });

        setSelected(person);

    };

    //==========================================================
    // DELETE PERSON
    //==========================================================

    const handleDelete = (
        id: string
    ) => {

        if (
            !window.confirm(
                "Delete this person?"
            )
        )
            return;

        const updated =
            deletePerson(
                tree,
                id
            );

        setTree(updated);

        if (
            selected?.id === id
        ) {

            setSelected(null);

        }

    };

    //==========================================================
    // UPDATE PERSON
    //==========================================================

    const updateSelected = (
        field: keyof FamilyMember,
        value: any
    ) => {

        if (!selected)
            return;

        const updated = {

            ...selected,

            [field]: value,

        };

        setSelected(updated);

        setTree(
            updatePerson(
                tree,
                updated
            )
        );

    };

    const handleConnect = () => {
        if (!selected || !relationTarget) return;
        if (relationTarget === selected.id) return;

        let updatedTree = tree;

        if (relationType === "parent") {
            updatedTree = connectParentChild(
                tree,
                relationTarget,
                selected.id
            );
        }

        if (relationType === "child") {
            updatedTree = connectParentChild(
                tree,
                selected.id,
                relationTarget
            );
        }

        if (relationType === "spouse") {
            updatedTree = connectSpouses(
                tree,
                selected.id,
                relationTarget
            );
        }

        if (relationType === "ex-spouse") {
            updatedTree = connectExSpouses(
                tree,
                selected.id,
                relationTarget
            );
        }

        if (relationType === "sibling") {
            updatedTree = connectSiblings(
                tree,
                selected.id,
                relationTarget
            );
        }

        if (relationType === "cousin") {
            updatedTree = connectCousins(
                tree,
                selected.id,
                relationTarget
            );
        }

        setTree(updatedTree);
        setSelected(
            updatedTree.members.find(
                member => member.id === selected.id
            ) || selected
        );
    };

    const handleRemoveConnection = (item: { relation: string; member: FamilyMember; className: string }) => {
        if (!selected) return;

        const relationTypeMap: Record<string, "parent" | "child" | "spouse" | "ex-spouse" | "sibling" | "cousin"> = {
            Parent: "parent",
            Child: "child",
            Spouse: "spouse",
            "Ex-Spouse": "ex-spouse",
            Sibling: "sibling",
            Cousin: "cousin",
        };

        const normalizedType = relationTypeMap[item.relation];
        if (!normalizedType) return;

        const updatedTree = disconnectRelationship(
            tree,
            selected.id,
            item.member.id,
            normalizedType
        );

        setTree(updatedTree);
        setSelected(updatedTree.members.find(member => member.id === selected.id) || selected);
        setRelationEditor(null);
        setRelationReplacementTarget("");
    };

    const handleStartConnectionChange = (item: { relation: string; member: FamilyMember; className: string }) => {
        setRelationEditor({ memberId: item.member.id, relation: item.relation });
        setRelationReplacementTarget("");
    };

    const handleSaveConnectionChange = (item: { relation: string; member: FamilyMember; className: string }) => {
        if (!selected || !relationReplacementTarget || relationReplacementTarget === item.member.id) return;

        const relationTypeMap: Record<string, "parent" | "child" | "spouse" | "ex-spouse" | "sibling" | "cousin"> = {
            Parent: "parent",
            Child: "child",
            Spouse: "spouse",
            "Ex-Spouse": "ex-spouse",
            Sibling: "sibling",
            Cousin: "cousin",
        };

        const normalizedType = relationTypeMap[item.relation];
        if (!normalizedType) return;

        let updatedTree = disconnectRelationship(tree, selected.id, item.member.id, normalizedType);

        if (normalizedType === "parent") {
            updatedTree = connectParentChild(updatedTree, relationReplacementTarget, selected.id);
        }
        else if (normalizedType === "child") {
            updatedTree = connectParentChild(updatedTree, selected.id, relationReplacementTarget);
        }
        else if (normalizedType === "spouse") {
            updatedTree = connectSpouses(updatedTree, selected.id, relationReplacementTarget);
        }
        else if (normalizedType === "ex-spouse") {
            updatedTree = connectExSpouses(updatedTree, selected.id, relationReplacementTarget);
        }
        else if (normalizedType === "sibling") {
            updatedTree = connectSiblings(updatedTree, selected.id, relationReplacementTarget);
        }
        else if (normalizedType === "cousin") {
            updatedTree = connectCousins(updatedTree, selected.id, relationReplacementTarget);
        }

        setTree(updatedTree);
        setSelected(updatedTree.members.find(member => member.id === selected.id) || selected);
        setRelationEditor(null);
        setRelationReplacementTarget("");
    };

    //==========================================================
    // EXPORT
    //==========================================================

    const handleExport = () => {

        const json =
            exportJSON(tree);

        const blob =
            new Blob(
                [json],
                {
                    type:
                        "application/json",
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const a =
            document.createElement(
                "a"
            );

        a.href = url;
        a.download =
            "family-tree.json";

        a.click();

        URL.revokeObjectURL(
            url
        );

    };

    //==========================================================
    // IMPORT
    //==========================================================

    const handleImport = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];

        if (!file)
            return;

        const reader =
            new FileReader();

        reader.onload = () => {

            try {

                const imported =
                    importJSON(
                        reader.result as string
                    );

                setTree(imported);

                setSelected(null);

            }
            catch {

                alert(
                    "Invalid JSON."
                );

            }

        };

        reader.readAsText(file);

    };

    //==========================================================
    // TOOLBAR
    //==========================================================

    const renderToolbar = () => (
        <div className="ft-toolbar">
            <button onClick={handleAddPerson}>➕ Add Person</button>
            <button onClick={handleExport}>📤 Export</button>
            <label className="ft-import">
                📥 Import
                <input hidden type="file" accept=".json" onChange={handleImport} />
            </label>
            <button onClick={() => setZoom(z => z + 0.1)}>＋</button>
            <button onClick={() => setZoom(z => Math.max(0.3, z - 0.1))}>－</button>
        </div>
    );

    //==========================================================
    // SIDEBAR
    //==========================================================

    const renderSidebar = () => (
        <div className="ft-sidebar">
            <input
                className="ft-search"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <h3>Members ({displayedMembers.length})</h3>
            <div className="ft-member-list">
                {sortPeople(displayedMembers).map(member => (
                    <div
                        key={member.id}
                        className={selected?.id === member.id ? "ft-member active" : "ft-member"}
                        onClick={() => setSelected(member)}
                        title={`${getFullName(member)}${member.deathDate ? " (Deceased)" : ""}`}
                    >
                        {getFullName(member)}
                    </div>
                ))}
            </div>
        </div>
    );

    //==========================================================
    // PERSON CARD
    //==========================================================

    const renderPersonCard = (person: FamilyMember) => {
        const isDeceased = person.deathDate && person.deathDate !== "";
        return (
            <div
                className={`ft-card ${isDeceased ? "deceased" : ""}`}
                key={person.id}
                onClick={() => setSelected(person)}
                style={{ opacity: isDeceased ? 0.7 : 1 }}
            >
                <div className="ft-photo">
                    {person.image ? <img src={person.image} alt={getFullName(person)} /> : "👤"}
                </div>
                <div className="ft-info">
                    <strong>{getFullName(person)}</strong>
                    {person.birthDate && <span>{person.birthDate}</span>}
                    {person.occupation && <span style={{ fontSize: "0.75rem", color: "#666" }}>{person.occupation}</span>}
                </div>
            </div>
        );
    };

    //==========================================================
    // TREE VIEW
    //==========================================================

    const renderTree = () => (
        <div className="ft-tree-container">
            <div
                className="ft-tree"
                ref={treeRef}
                style={{ transform: `scale(${zoom})` }}
                onDragOver={event => event.preventDefault()}
                onDrop={handleDropOnTree}
            >
                <svg
                    className="ft-relations-svg"
                    viewBox={`0 0 ${treeDimensions.width} ${treeDimensions.height}`}
                    preserveAspectRatio="none"
                >
                    {connections.map(connection => (
                        <line
                            key={connection.id}
                            x1={connection.fromX}
                            y1={connection.fromY}
                            x2={connection.toX}
                            y2={connection.toY}
                            className={`ft-connection ft-connection--${connection.type}`}
                        />
                    ))}
                </svg>
                {displayedMembers.map(person => {
                    const position = memberPositions[person.id] ?? { x: 0, y: 0 };

                    return (
                        <div
                            key={person.id}
                            className="ft-card-wrap"
                            style={{
                                position: "absolute",
                                left: `${position.x * 220}px`,
                                top: `${position.y * 240}px`,
                                cursor: "grab",
                            }}
                            ref={node => {
                                cardRefs.current[person.id] = node;
                            }}
                            draggable
                            onDragStart={event => {
                                event.dataTransfer.effectAllowed = "move";
                                setDraggedMemberId(person.id);
                            }}
                            onDragEnd={() => setDraggedMemberId(null)}
                            onClick={() => setSelected(person)}
                        >
                            {renderPersonCard(person)}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    //==========================================================
    // EDITOR
    //==========================================================

    const renderEditor = () => {
        if (!selected) {
            return (
                <div className="ft-editor">
                    <h2>No Selection</h2>
                    <p>Select someone from the tree.</p>
                </div>
            );
        }

        return (
            <div className="ft-editor">
                <h2>Edit Person</h2>
                <label>
                    First Name
                    <input
                        value={selected.firstName}
                        onChange={e => updateSelected("firstName", e.target.value)}
                    />
                </label>
                <label>
                    Last Name
                    <input
                        value={selected.lastName}
                        onChange={e => updateSelected("lastName", e.target.value)}
                    />
                </label>
                <label>
                    Gender
                    <select
                        value={selected.gender}
                        onChange={e => updateSelected("gender", e.target.value as "male" | "female" | "other")}
                        style={{ padding: "0.6rem", border: "1px solid #ddd", borderRadius: "6px" }}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>
                <label>
                    Birth Date
                    <input
                        type="date"
                        value={selected.birthDate || ""}
                        onChange={e => updateSelected("birthDate", e.target.value)}
                    />
                </label>
                <label>
                    Death Date
                    <input
                        type="date"
                        value={selected.deathDate || ""}
                        onChange={e => updateSelected("deathDate", e.target.value)}
                    />
                </label>
                <label>
                    Occupation
                    <input
                        value={selected.occupation || ""}
                        onChange={e => updateSelected("occupation", e.target.value)}
                    />
                </label>
                <label>
                    Email
                    <input
                        type="email"
                        value={selected.email || ""}
                        onChange={e => updateSelected("email", e.target.value)}
                    />
                </label>
                <label>
                    Phone
                    <input
                        type="tel"
                        value={selected.phone || ""}
                        onChange={e => updateSelected("phone", e.target.value)}
                    />
                </label>
                <label>
                    Notes
                    <textarea
                        rows={4}
                        value={selected.notes || ""}
                        onChange={e => updateSelected("notes", e.target.value)}
                    />
                </label>
                <div className="ft-connection-panel">
                    <p className="ft-connection-label">Connect selected member</p>
                    <div className="ft-connection-controls">
                        <select
                            value={relationType}
                            onChange={e => setRelationType(e.target.value as "parent" | "child" | "spouse" | "sibling" | "cousin" | "ex-spouse")}
                        >
                            <option value="parent">Add Parent</option>
                            <option value="child">Add Child</option>
                            <option value="spouse">Add Spouse</option>
                            <option value="ex-spouse">Add Ex-Spouse</option>
                            <option value="sibling">Add Sibling</option>
                            <option value="cousin">Add Cousin</option>
                        </select>
                        <select
                            value={relationTarget}
                            onChange={e => setRelationTarget(e.target.value)}
                        >
                            <option value="">Choose member</option>
                            {tree.members
                                .filter(member => member.id !== selected.id)
                                .map(member => (
                                    <option key={member.id} value={member.id}>
                                        {getFullName(member)}
                                    </option>
                                ))}
                        </select>
                        <button type="button" className="ft-connect-button" onClick={handleConnect}>
                            Connect
                        </button>
                    </div>
                </div>
                <div className="ft-relation-list">
                    <h3>Connections</h3>
                    {selectedRelations.length === 0 ? (
                        <p className="ft-no-relations">No connections yet.</p>
                    ) : (
                        <ul>
                            {selectedRelations.map(item => {
                                const isEditing = relationEditor?.memberId === item.member.id && relationEditor?.relation === item.relation;

                                return (
                                    <li key={`${item.member.id}-${item.relation}`} className={item.className}>
                                        <div className="ft-relation-main">
                                            <span className="ft-relation-label">{item.relation}</span>
                                            <span>{getFullName(item.member)}</span>
                                        </div>
                                        <div className="ft-relation-actions">
                                            <button
                                                type="button"
                                                className="ft-relation-action-button"
                                                onClick={() => handleStartConnectionChange(item)}
                                            >
                                                Change
                                            </button>
                                            <button
                                                type="button"
                                                className="ft-relation-action-button ft-relation-action-button--danger"
                                                onClick={() => handleRemoveConnection(item)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        {isEditing && selected && (
                                            <div className="ft-relation-edit">
                                                <select
                                                    value={relationReplacementTarget}
                                                    onChange={e => setRelationReplacementTarget(e.target.value)}
                                                >
                                                    <option value="">Choose replacement</option>
                                                    {tree.members
                                                        .filter(member => member.id !== selected.id && member.id !== item.member.id)
                                                        .map(member => (
                                                            <option key={member.id} value={member.id}>
                                                                {getFullName(member)}
                                                            </option>
                                                        ))}
                                                </select>
                                                <div className="ft-relation-edit-actions">
                                                    <button
                                                        type="button"
                                                        className="ft-relation-action-button"
                                                        onClick={() => handleSaveConnectionChange(item)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="ft-relation-action-button"
                                                        onClick={() => { setRelationEditor(null); setRelationReplacementTarget(""); }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <button className="delete-button" onClick={() => handleDelete(selected.id)}>
                    Delete Person
                </button>
            </div>
        );
    };

    //==========================================================
    // RETURN
    //==========================================================

    return (
        <div className="family-tree-page">
            <header>
                <h1>🌳 Family Tree</h1>
            </header>
            {renderToolbar()}
            <div className="ft-layout">
                {renderSidebar()}
                {renderTree()}
                {renderEditor()}
            </div>
        </div>
    );
};

export default FamilyTree;