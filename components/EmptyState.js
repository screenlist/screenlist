const EmptyState = ({text, height}) => {
	return (
		<div style={height ? {minHeight: height} : {minHeight: '100%'}} className="empty-state-container">
			<div className="empty-state-text-container">
				<p>{text}</p>
			</div>
		</div>
	)
}

export default EmptyState