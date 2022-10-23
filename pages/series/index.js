import CreateSeriesForm from '../../components/CreateSeriesForm'
import AddButton from '../../components/AddButton'

const Series = () => {
	return (
		<div>
			<div>
				<AddButton type='series' />
			</div>
			<section>
				<p>Not series found.</p>
			</section>
		</div>
	)
}

export default Series