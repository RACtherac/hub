import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/FamilyTree.css";

import type {
    FamilyFolder,
    FamilyMember,
    FamilyTreeData,
} from "../types/FamilyTreeTypes";

import {
    connectCousins,
    connectExSpouses,
    connectParentChild,
    connectSiblings,
    connectSpouses,
    createAutoLayoutPositions,
    createPerson,
    createSampleTree,
    deletePerson,
    disconnectRelationship,
    exportJSON,
    getBranchMembers,
    getFullName,
    importJSON,
    loadTree,
    saveTree,
    searchPeople,
    sortPeople,
    updatePerson,
} from "../utils/FamilyTreeUtils";

const FamilyTree: React.FC = () => {
    const navigate = useNavigate();

    //==========================================================
    // STATE
    //==========================================================

    const [tree, setTree] = useState<FamilyTreeData>({
        members: [],
        folders: [],
    });

    const [selected, setSelected] =
        useState<FamilyMember | null>(null);

    const [search, setSearch] =
        useState("");

    const [activeBranchId, setActiveBranchId] =
        useState<string | null>(null);

    const [folderDraft, setFolderDraft] =
        useState<{ id: string | null; name: string; memberIds: string[] }>({
            id: null,
            name: "",
            memberIds: [],
        });

    const [expandedFolders, setExpandedFolders] =
        useState<Record<string, boolean>>({});

    const customFolders = useMemo(() => tree.folders ?? [], [tree.folders]);

    const [zoom, setZoom] =
        useState(1);

    const [viewOffset, setViewOffset] =
        useState({ x: 0, y: 0 });

    const [memberPositions, setMemberPositions] =
        useState<Record<string, { x: number; y: number }>>({});

    const [draggedMemberId, setDraggedMemberId] =
        useState<string | null>(null);
    const [dragOverFolderId, setDragOverFolderId] =
        useState<string | null>(null);

    const [relationTarget, setRelationTarget] =
        useState("");

    const CARD_WIDTH = 180;
    const CARD_HEIGHT = 200;
    const GRID_STEP_X = 240;
    const GRID_STEP_Y = 260;
    const NODE_OFFSET_X = 90;


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
            controlX: number;
            controlY: number;
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

        try {
            const loaded = loadTree();
            const normalizedTree = {
                members: loaded.members ?? [],
                folders: Array.isArray(loaded.folders) ? loaded.folders : [],
            };

            if (normalizedTree.members.length === 0) {
                const sample = {
                    ...createSampleTree(),
                    folders: [],
                };
                setTree(sample);
                setMemberPositions(createAutoLayoutPositions(sample.members));
            }
            else {
                setTree(normalizedTree);
                setMemberPositions(createAutoLayoutPositions(normalizedTree.members));
            }
        }
        catch {
            const sample = {
                ...createSampleTree(),
                folders: [],
            };
            setTree(sample);
            setMemberPositions(createAutoLayoutPositions(sample.members));
        }
        setZoom(1);
        setViewOffset({ x: 0, y: 0 });
        setSelected(null);

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

    const branchRoots = useMemo(() => {
        return tree.members.filter(member => member.parents.length === 0);
    }, [tree.members]);

    const displayedMembers = useMemo(() => {
        const sourceMembers = tree.members;

        if (search.trim() === "") return sourceMembers;
        return searchPeople(sourceMembers, search);
    }, [tree.members, search]);

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

    useEffect(() => {
        if (selected && !displayedMembers.some(member => member.id === selected.id)) {
            setSelected(null);
        }
    }, [displayedMembers, selected]);

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
            const nextPositions = createAutoLayoutPositions(displayedMembers);
            const hasChanged = Object.keys(nextPositions).some(id => {
                const current = prev[id];
                const next = nextPositions[id];
                return !current || current.x !== next.x || current.y !== next.y;
            });

            if (!hasChanged && Object.keys(prev).length === Object.keys(nextPositions).length) {
                return prev;
            }

            return nextPositions;
        });
    }, [displayedMembers]);

    const handleDropOnTree = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!draggedMemberId || !treeRef.current) return;

        const rect = treeRef.current.getBoundingClientRect();
        const scaledX = (event.clientX - rect.left) / zoom;
        const scaledY = (event.clientY - rect.top) / zoom;
        const x = Math.round(scaledX / GRID_STEP_X);
        const y = Math.round(scaledY / GRID_STEP_Y);

        setMemberPositions(prev => {
            const hasPrev = Object.keys(prev).length > 0;
            const base = hasPrev ? prev : createAutoLayoutPositions(tree.members);
            return {
                ...base,
                [draggedMemberId]: { x, y },
            };
        });
        setDraggedMemberId(null);
    };

    const handleDropOnFolder = (folderId: string, event: React.DragEvent<HTMLDivElement | HTMLButtonElement>) => {
        event.preventDefault();
        if (!draggedMemberId) return;

        setTree(current => {
            const targetFolder = (current.folders ?? []).find(folder => folder.id === folderId);
            if (!targetFolder) return current;

            const memberIds = targetFolder.memberIds.includes(draggedMemberId)
                ? targetFolder.memberIds
                : [...targetFolder.memberIds, draggedMemberId];

            return {
                ...current,
                folders: (current.folders ?? []).map(folder => {
                    if (folder.id !== folderId) return folder;
                    return {
                        ...folder,
                        memberIds,
                    };
                }),
            };
        });

        setDraggedMemberId(null);
        setDragOverFolderId(null);
    };

    useLayoutEffect(() => {
        const maxX = Math.max(
            1,
            ...Object.values(memberPositions).map(position => position.x)
        );
        const maxY = Math.max(
            1,
            ...Object.values(memberPositions).map(position => position.y)
        );

        setTreeDimensions({
            width: Math.max(1200, (maxX + 2) * GRID_STEP_X),
            height: Math.max(800, (maxY + 2) * GRID_STEP_Y),
        });

        const positions: Record<string, { x: number; y: number }> = {};

        Object.entries(memberPositions).forEach(([id, position]) => {
            positions[id] = position;
        });


        const lines: typeof connections = [];

        const getConnectionPoints = (
            fromPosition: { x: number; y: number },
            toPosition: { x: number; y: number },
            relationType: "parent" | "spouse" | "sibling" | "cousin" | "ex-spouse"
        ) => {
            const fromXBase = fromPosition.x * GRID_STEP_X;
            const fromYBase = fromPosition.y * GRID_STEP_Y;
            const toXBase = toPosition.x * GRID_STEP_X;
            const toYBase = toPosition.y * GRID_STEP_Y;
            const deltaX = toPosition.x - fromPosition.x;
            const deltaY = toPosition.y - fromPosition.y;

            if (relationType === "parent") {
                const fromX = fromXBase + NODE_OFFSET_X;
                const toX = toXBase + NODE_OFFSET_X;
                return {
                    fromX,
                    fromY: fromYBase + CARD_HEIGHT - 10,
                    toX,
                    toY: toYBase + 10,
                };
            }

            if (relationType === "spouse") {
                const fromX = fromXBase + (deltaX >= 0 ? CARD_WIDTH - 20 : 20);
                const toX = toXBase + (deltaX <= 0 ? CARD_WIDTH - 20 : 20);
                return {
                    fromX,
                    fromY: fromYBase + CARD_HEIGHT / 2,
                    toX,
                    toY: toYBase + CARD_HEIGHT / 2,
                };
            }

            if (relationType === "sibling") {
                const fromX = fromXBase + CARD_WIDTH / 2;
                const toX = toXBase + CARD_WIDTH / 2;
                return {
                    fromX,
                    fromY: fromYBase + CARD_HEIGHT / 2 - 10,
                    toX,
                    toY: toYBase + CARD_HEIGHT / 2 - 10,
                };
            }

            const fromX = fromXBase + (deltaX >= 0 ? CARD_WIDTH - 30 : 30);
            const toX = toXBase + (deltaX <= 0 ? CARD_WIDTH - 30 : 30);
            const fromY = fromYBase + CARD_HEIGHT / 2 + (deltaY >= 0 ? 10 : -10);
            const toY = toYBase + CARD_HEIGHT / 2 + (deltaY <= 0 ? 10 : -10);

            return {
                fromX,
                fromY,
                toX,
                toY,
            };
        };

        tree.members.forEach(member => {
            const memberPos = positions[member.id];
            if (!memberPos) return;

            member.parents.forEach(parentId => {
                const parentPos = positions[parentId];
                if (!parentPos) return;

                const { fromX, fromY, toX, toY } = getConnectionPoints(parentPos, memberPos, "parent");

                lines.push({
                    id: `${parentId}-${member.id}`,
                    fromX,
                    fromY,
                    toX,
                    toY,
                    controlX: (fromX + toX) / 2,
                    controlY: Math.min(fromY, toY) - 60,
                    type: "parent",
                });
            });

            member.spouses.forEach(spouseId => {
                if (member.id >= spouseId) return;
                const spousePos = positions[spouseId];
                if (!spousePos) return;

                const { fromX, fromY, toX, toY } = getConnectionPoints(memberPos, spousePos, "spouse");

                lines.push({
                    id: `${member.id}-spouse-${spouseId}`,
                    fromX,
                    fromY,
                    toX,
                    toY,
                    controlX: (fromX + toX) / 2,
                    controlY: Math.min(fromY, toY) - 45,
                    type: "spouse",
                });
            });

            member.exSpouses.forEach(spouseId => {
                if (member.id >= spouseId) return;
                const spousePos = positions[spouseId];
                if (!spousePos) return;

                const { fromX, fromY, toX, toY } = getConnectionPoints(memberPos, spousePos, "spouse");

                lines.push({
                    id: `${member.id}-ex-spouse-${spouseId}`,
                    fromX,
                    fromY,
                    toX,
                    toY,
                    controlX: (fromX + toX) / 2,
                    controlY: Math.min(fromY, toY) - 35,
                    type: "ex-spouse",
                });
            });

            member.siblings.forEach(siblingId => {
                if (member.id >= siblingId) return;
                const siblingPos = positions[siblingId];
                if (!siblingPos) return;

                const { fromX, fromY, toX, toY } = getConnectionPoints(memberPos, siblingPos, "sibling");

                lines.push({
                    id: `${member.id}-sib-${siblingId}`,
                    fromX,
                    fromY,
                    toX,
                    toY,
                    controlX: (fromX + toX) / 2,
                    controlY: Math.min(fromY, toY) - 35,
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

                const { fromX, fromY, toX, toY } = getConnectionPoints(memberPos, cousinPos, "cousin");

                lines.push({
                    id: `${member.id}-cousin-${cousinId}`,
                    fromX,
                    fromY,
                    toX,
                    toY,
                    controlX: (fromX + toX) / 2,
                    controlY: Math.min(fromY, toY) - 35,
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
        setMemberPositions(createAutoLayoutPositions([...tree.members, person]));
        setZoom(1);
        setViewOffset({ x: 0, y: 0 });
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
                setMemberPositions(createAutoLayoutPositions(imported.members));
                setZoom(1);
                setViewOffset({ x: 0, y: 0 });
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

    const handleResetView = () => {
        setZoom(1);
        setViewOffset({ x: 0, y: 0 });
        setMemberPositions(createAutoLayoutPositions(tree.members));
        setSearch("");
        setActiveBranchId(null);
        setSelected(null);
        setRelationTarget("");
        setRelationEditor(null);
        setRelationReplacementTarget("");
    };

    const handleFitToView = () => {
        if (!treeRef.current) return;

        const containerWidth = treeRef.current.clientWidth;
        const containerHeight = treeRef.current.clientHeight;
        const neededWidth = Math.max(1200, (Math.max(1, ...Object.values(memberPositions).map(position => position.x)) + 2) * GRID_STEP_X);
        const neededHeight = Math.max(800, (Math.max(1, ...Object.values(memberPositions).map(position => position.y)) + 2) * GRID_STEP_Y);
        const widthRatio = containerWidth / neededWidth;
        const heightRatio = containerHeight / neededHeight;
        const nextZoom = Math.min(1, Math.max(0.3, Math.min(widthRatio, heightRatio)));

        setZoom(nextZoom);
        setViewOffset({ x: 0, y: 0 });
    };

    const handleCenterSelected = () => {
        if (!selected || !treeRef.current) return;

        const selectedPosition = memberPositions[selected.id] ?? { x: 0, y: 0 };
        const containerWidth = treeRef.current.clientWidth;
        const containerHeight = treeRef.current.clientHeight;
        const scaledCenterX = (selectedPosition.x * GRID_STEP_X + CARD_WIDTH / 2) * zoom;
        const scaledCenterY = (selectedPosition.y * GRID_STEP_Y + CARD_HEIGHT / 2) * zoom;

        setViewOffset({
            x: containerWidth / 2 - scaledCenterX,
            y: containerHeight / 2 - scaledCenterY,
        });
    };

    const handleCreateFolder = () => {
        const trimmedName = folderDraft.name.trim();
        if (!trimmedName || folderDraft.memberIds.length === 0) {
            alert("Give the folder a name and choose at least one member.");
            return;
        }

        const nextFolder: FamilyFolder = {
            id: folderDraft.id ?? crypto.randomUUID(),
            name: trimmedName,
            memberIds: [...new Set(folderDraft.memberIds)],
        };

        setTree(current => ({
            ...current,
            folders: current.folders?.some(folder => folder.id === nextFolder.id)
                ? (current.folders ?? []).map(folder => folder.id === nextFolder.id ? nextFolder : folder)
                : [...(current.folders ?? []), nextFolder],
        }));

        setExpandedFolders(current => ({
            ...current,
            [nextFolder.id]: true,
        }));

        setFolderDraft({ id: null, name: "", memberIds: [] });
        setActiveBranchId(nextFolder.id);
    };

    const handleEditFolder = (folder: FamilyFolder) => {
        setFolderDraft({
            id: folder.id,
            name: folder.name,
            memberIds: [...folder.memberIds],
        });
        setExpandedFolders(current => ({
            ...current,
            [folder.id]: true,
        }));
        setActiveBranchId(folder.id);
    };

    const handleDeleteFolder = (folderId: string) => {
        setTree(current => ({
            ...current,
            folders: (current.folders ?? []).filter(folder => folder.id !== folderId),
        }));

        setExpandedFolders(current => {
            const next = { ...current };
            delete next[folderId];
            return next;
        });

        if (activeBranchId === folderId) {
            setActiveBranchId(null);
        }

        if (folderDraft.id === folderId) {
            setFolderDraft({ id: null, name: "", memberIds: [] });
        }
    };

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
            <button onClick={handleFitToView}>🧭 Fit</button>
            <button onClick={handleCenterSelected}>🎯 Center</button>
            <button onClick={() => setActiveBranchId(null)}>🗂️ All Branches</button>
            <button className="ft-toolbar-reset" onClick={handleResetView}>↺ Reset View</button>
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

            <div className="ft-branch-panel">
                <div className="ft-family-mode-row">
                    <button
                        type="button"
                        className={activeBranchId === null ? "ft-family-mode-button active" : "ft-family-mode-button"}
                        onClick={() => setActiveBranchId(null)}
                    >
                        All People
                    </button>
                    <div className="ft-family-mode-divider">/</div>
                    <span className="ft-family-mode-label">Family Groups</span>
                </div>
                <p className="ft-family-mode-help">Groups are just buckets for organizing families — everyone still stays in the main tree.</p>

                <div className="ft-folder-editor">
                    <input
                        className="ft-folder-name"
                        value={folderDraft.name}
                        onChange={event => setFolderDraft(current => ({ ...current, name: event.target.value }))}
                        placeholder="Folder name"
                    />

                    <select
                        className="ft-folder-member-select"
                        value=""
                        onChange={event => {
                            const selectedId = event.target.value;
                            if (!selectedId) return;
                            setFolderDraft(current => ({
                                ...current,
                                memberIds: current.memberIds.includes(selectedId)
                                    ? current.memberIds
                                    : [...current.memberIds, selectedId],
                            }));
                            event.target.value = "";
                        }}
                    >
                        <option value="">Add member</option>
                        {tree.members.map(member => (
                            <option key={member.id} value={member.id}>
                                {getFullName(member)}
                            </option>
                        ))}
                    </select>

                    <div className="ft-folder-member-pills">
                        {folderDraft.memberIds.length === 0 ? (
                            <span className="ft-folder-empty">No members selected</span>
                        ) : (
                            tree.members
                                .filter(member => folderDraft.memberIds.includes(member.id))
                                .map(member => (
                                    <button
                                        type="button"
                                        key={member.id}
                                        className="ft-folder-pill"
                                        onClick={() => setFolderDraft(current => ({
                                            ...current,
                                            memberIds: current.memberIds.filter(id => id !== member.id),
                                        }))}
                                    >
                                        {getFullName(member)} ×
                                    </button>
                                ))
                        )}
                    </div>

                    <div className="ft-folder-actions">
                        <button type="button" className="ft-folder-save" onClick={handleCreateFolder}>
                            {folderDraft.id ? "Save Folder" : "Create Folder"}
                        </button>
                        {folderDraft.id && (
                            <button type="button" className="ft-folder-cancel" onClick={() => setFolderDraft({ id: null, name: "", memberIds: [] })}>
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {branchRoots.length === 0 && customFolders.length === 0 ? (
                    <p className="ft-empty-branches">No family roots yet.</p>
                ) : (
                    [...branchRoots.map(root => ({
                        id: root.id,
                        label: getFullName(root),
                        count: getBranchMembers(tree.members, root.id).length,
                        type: "root" as const,
                    })), ...customFolders.map(folder => ({
                        id: folder.id,
                        label: folder.name,
                        count: folder.memberIds.length,
                        type: "folder" as const,
                        folder,
                    }))].map(item => {
                        const isActive = activeBranchId === item.id;
                        const isExpanded = item.type === "folder" ? expandedFolders[item.id] ?? true : true;

                        return (
                            <div
                                key={item.id}
                                className={isActive ? "ft-branch-wrap active" : "ft-branch-wrap"}
                                onDragOver={item.type === "folder" ? event => {
                                    event.preventDefault();
                                    setDragOverFolderId(item.id);
                                } : undefined}
                                onDragLeave={item.type === "folder" ? () => setDragOverFolderId(current => current === item.id ? null : current) : undefined}
                                onDrop={item.type === "folder" ? event => handleDropOnFolder(item.id, event) : undefined}
                            >
                                <div className="ft-branch-main-row">
                                    <button
                                        type="button"
                                        className={isActive ? "ft-branch active" : "ft-branch"}
                                        onClick={() => setActiveBranchId(isActive ? null : item.id)}
                                        title={item.type === "folder" ? "Select this folder to manage it; the main tree still shows all people." : "Select this branch to manage it; the main tree still shows all people."}
                                        onDragOver={item.type === "folder" ? event => { event.preventDefault(); } : undefined}
                                        onDrop={item.type === "folder" ? event => handleDropOnFolder(item.id, event) : undefined}
                                    >
                                        <span className="ft-branch-icon">{item.type === "folder" ? "📁" : "🌳"}</span>
                                        <span className="ft-branch-label">{item.label}</span>
                                        <span className="ft-branch-count">{item.count}</span>
                                    </button>

                                    {item.type === "folder" && (
                                        <button
                                            type="button"
                                            className="ft-folder-toggle"
                                            onClick={() => setExpandedFolders(current => ({
                                                ...current,
                                                [item.id]: !(current[item.id] ?? true),
                                            }))}
                                            aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
                                        >
                                            {isExpanded ? "▾" : "▸"}
                                        </button>
                                    )}
                                </div>

                                {item.type === "folder" && isExpanded && (
                                    <div
                                        className={dragOverFolderId === item.id ? "ft-folder-member-list drag-over" : "ft-folder-member-list"}
                                        onDragOver={event => {
                                            event.preventDefault();
                                            setDragOverFolderId(item.id);
                                        }}
                                        onDragLeave={() => setDragOverFolderId(current => current === item.id ? null : current)}
                                        onDrop={event => handleDropOnFolder(item.id, event)}
                                    >
                                        {item.folder.memberIds.length === 0 ? (
                                            <span className="ft-folder-empty">No members</span>
                                        ) : (
                                            item.folder.memberIds.map(memberId => {
                                                const member = tree.members.find(entry => entry.id === memberId);
                                                if (!member) return null;

                                                return (
                                                    <button
                                                        key={member.id}
                                                        type="button"
                                                        className="ft-folder-member-item"
                                                        onClick={() => setSelected(member)}
                                                    >
                                                        {getFullName(member)}
                                                    </button>
                                                );
                                            })
                                        )}
                                    </div>
                                )}

                                {item.type === "folder" && (
                                    <div className="ft-branch-row-actions">
                                        <button type="button" onClick={() => {
                                            const folder = customFolders.find(entry => entry.id === item.id);
                                            if (folder) handleEditFolder(folder);
                                        }}>Edit</button>
                                        <button type="button" onClick={() => setSelected(null)}>View All</button>
                                        <button type="button" className="danger" onClick={() => handleDeleteFolder(item.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

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
                style={{ transform: `translate(${viewOffset.x}px, ${viewOffset.y}px) scale(${zoom})` }}
                onDragOver={event => event.preventDefault()}
                onDrop={handleDropOnTree}
            >
                <svg
                    className="ft-relations-svg"
                    viewBox={`0 0 ${treeDimensions.width} ${treeDimensions.height}`}
                    width={treeDimensions.width}
                    height={treeDimensions.height}
                    preserveAspectRatio="xMinYMin meet"
                >
                    {connections.map(connection => (
                        <path
                            key={connection.id}
                            d={`M ${connection.fromX} ${connection.fromY} Q ${connection.controlX} ${connection.controlY} ${connection.toX} ${connection.toY}`}
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
                                left: `${position.x * GRID_STEP_X}px`,
                                top: `${position.y * GRID_STEP_Y}px`,
                                cursor: "grab",
                                zIndex: 2,
                            }}
                            ref={node => {
                                cardRefs.current[person.id] = node;
                            }}
                            draggable
                            onDragStart={event => {
                                event.dataTransfer.effectAllowed = "move";
                                event.dataTransfer.setData("text/plain", person.id);
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
            <header className="ft-topbar">
                <button
                    className="ft-topbar-back"
                    onClick={() => navigate("/")}
                >
                    ← OH<span>/</span>Hub
                </button>

                <span className="ft-topbar-title">Family Tree</span>
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