function Note({note, category, onAction, showIcons=true, isBeingDeleted=false}) {
    const [now, setNow] = React.useState(Date.now())
    const [open, setOpen] = React.useState(false)
	const [openUpdateNoteModal, setOpenUpdateNoteModal] = React.useState(false)

	React.useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval);
    }, []);

    function formatRelativeTime(isoDate) {
        const current = new Date(now);
        const date = new Date(isoDate)

        const diffMs = current - date
        const diffSeconds = Math.floor(diffMs / 1000)
        const diffMinutes = Math.floor(diffSeconds / 60)
        const diffHours = Math.floor(diffMinutes / 60)
        const diffDays = Math.floor(diffHours / 24)
        const diffWeeks = Math.floor(diffDays / 7)

        if (diffSeconds < 10) return 'just now'
        if (diffSeconds < 60) return `${diffSeconds} seconds ago`

        if (diffMinutes === 1) return '1 minute ago'
        if (diffMinutes < 60) return `${diffMinutes} minutes ago`

        if (diffHours === 1) return '1 hour ago'
        if (diffHours < 24) return `${diffHours} hours ago`

        if (diffDays === 1) return '1 day ago'
        if (diffDays < 7) return `${diffDays} days ago`

        if (diffWeeks === 1) return '1 week ago'
        if (diffWeeks < 4) return `${diffWeeks} weeks ago`

        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <>
			{ openUpdateNoteModal && note.is_archived === false && isBeingDeleted === false &&
				<UpdateNoteModal
					note={note}
					category={category}
					isOpen={openUpdateNoteModal}
					onClose={() => setOpenUpdateNoteModal(false)}
					onAction={onAction}
				/>
			}

            { open &&
                <DeleteNoteModal isOpen={open} onClose={() => setOpen(false)} note={note} onDelete={onAction}/>
            }

            <div style={styles.card} className="clickable-icon" onClick={(e) => {
				if (e.target.closest('.action-icon')) return
				setOpenUpdateNoteModal(true)
			}}>
                <div style={styles.header}>
                    <h3 style={styles.title}>{note.title}</h3>

                    { showIcons &&
                        <div style={styles.actions} className="action-icon">
                            <img
                                src={note.is_archived ? "../assets/icon/mdiArchiveOff.svg" : "../assets/icon/mdiArchive.svg"}
                                alt={note.is_archived ? "Unarchive" : "Archive"}
                                className="clickable-icon"
                                style={styles.footerIcon}
                                onClick={async () => {
                                    if (note.is_archived === false) {
                                        await archiveNote(note._id)
                                    } else {
										await unarchiveNote(note._id)
                                        // TODO: also in backend archive
                                    }

                                    await onAction()
                                }}
                            />

                            <img
                                src="../assets/icon/mdiTrash.svg"
                                alt="Trash"
                                className="clickable-icon"
                                style={styles.footerIcon}
                                onClick={async () => {
                                    setOpen(true)
                                }}
                            />
                        </div>
                    }
                </div>

                <p style={styles.bodyText}>
                    {note.content}
                </p>

                <div style={styles.footer}>
                    <img
                        src="../assets/icon/mdiClock.svg"
                        alt="Trash"
                        style={styles.footerIcon}
                    />

                    <span style={styles.footerText}>
                        {formatRelativeTime(note.updated_at)}, <strong>{note.note_creator.name}</strong>
                    </span>
                </div>
            </div>
        </>
    )
}

const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",

        width: "100%",
        breakInside: "avoid",

        marginBottom: "0.5rem",
        backgroundColor: "var(--note-color)",
        borderRadius: "8px",
        border: "1px solid var(--border-color)",
        padding: "1rem",
    },
    header: {
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
    },
    title: {
        margin: 0,
        fontSize: "15px",
        fontWeight: 700,
    },
    actions: {
        position: "absolute",
        top: -13,
        right: -13,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.20rem",
    },
    iconBtn: {
        cursor: "pointer",
    },
    bodyText: {
        margin: 0,
        fontSize: "14px",
        lineHeight: 1.4,
        wordBreak: "break-word",
    },
    footer: {
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
    },
    footerIcon: {
      width: "20px",
      height: "20px"
    },
    footerText: {
        fontSize: "12px",
        color: "#6b7280",
    },
};