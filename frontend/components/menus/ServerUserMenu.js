function ServerUserMenu({ isOpen, onClose, triggerRef, serverId, userId, refetchServers, refetchNotes }) {
    const menuRef = React.useRef(null);
    const [showDeleteAllNotesModal, setShowDeleteAllNotesModal] = React.useState(false);
    const [showBanModal, setShowBanModal] = React.useState(false);

    React.useEffect(() => {
        function handleClickOutside(event) {
            // Check if click is outside both menu and trigger button
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                triggerRef?.current && !triggerRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, onClose, triggerRef])

    //    if (!isOpen) return null;

    const styles = {
        dropdown: {
            position: 'absolute',
            top: '100%',
            right: '0px',
            marginBottom: '4px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            minWidth: '180px',
            zIndex: 1000,
            overflow: 'hidden',
        },
        menuItem: {
            display: 'flex',
            alignContent: 'center',
            gap: '12px',
            padding: '10px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#374151',
            transition: 'background-color 0.2s',
            backgroundColor: 'white',
            borderBottom: "1px solid #e5e7eb"
        },
        menuItemIcon: {
            width: '20px',
            height: 'auto',
        },
    }

    return (
        <>
            {isOpen && (
                <div style={styles.dropdown} ref={menuRef}>
                    <div
                        style={styles.menuItem}
                        className="menu-item"
                        onClick={async (e) => {
                            e.stopPropagation();
                            onClose()
                            setShowBanModal(true);
                        }}
                    >
                        <img src="../../assets/icon/mdiCancel.svg" alt="Ban" style={styles.menuItemIcon} />
                        <span>Kick user</span>
                    </div>

                    <div
                        style={styles.menuItem}
                        className="menu-item"
                        onClick={async (e) => {
                            e.stopPropagation();
                            onClose()
                            setShowDeleteAllNotesModal(true);
                        }}
                    >
                        <img src="../../assets/icon/mdiBroom.svg" alt="Clear" style={styles.menuItemIcon} />
                        <span>Clear notes</span>
                    </div>
                </div>
            )}

            <DeleteAllNotesModal
                isOpen={showDeleteAllNotesModal}
                onClose={() => setShowDeleteAllNotesModal(false)}
                serverId={serverId}
                userId={userId}
                onDelete={async (serverId, userId) => {
                    await deleteUserNotesInServer(serverId, userId);
                    await refetchNotes();
                    onClose();
                }}
            />
            <BanModal
                isOpen={showBanModal}
                onClose={() => setShowBanModal(false)}
                serverId={serverId}
                userId={userId}
                onBan={async (serverId, userId) => {
                    await kickUser(serverId, userId);
                    await refetchServers();
                    onClose();
                }}
            />

        </>
    );
}