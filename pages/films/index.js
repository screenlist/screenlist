import CreateFilmForm from '../../components/CreateFilmForm'
import AddButton from '../../components/AddButton'

const Films = () => {
	return (
		<div>
			<div>
				<AddButton type='film' />
			</div>
			<section>
				<p>Not films found.</p>
			</section>
		</div>
	)
}

export default Films