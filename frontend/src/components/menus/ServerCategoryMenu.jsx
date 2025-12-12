import mdiLogout from "../../assets/icon/mdiLogout.svg"
import mdiPlus from "../../assets/icon/mdiPlus.svg"
import "../../assets/css/Menu.css"

import {useEffect, useRef} from "react";

export default function ServerCategoryMenu({ isOpen, onClose, triggerRef }) {
    const menuRef = useRef(null);

    useEffect(() => {
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

    if (!isOpen) return null;

    return (
        <div style={styles.dropdown} ref={menuRef}>
            <div
                style={styles.menuItem}
                className="menu-item"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log("ban user logic")
                }}
            >
                <img src={mdiPlus} alt="create" style={styles.menuItemIcon} />
                <span>Create server</span>
            </div>
            <div
                style={styles.menuItem}
                className="menu-item"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log("clear all notes logic")

                }}
            >
                <img src={mdiLogout} alt="join" style={styles.menuItemIcon} />
                <span>Join server</span>
            </div>
        </div>
    );
}

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
        zIndex: 3000,
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