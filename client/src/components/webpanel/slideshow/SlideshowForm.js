import { Form, Row, Col } from 'react-bootstrap';

const SlideshowForm = ({ handleChange, handleImage, values, error }) => {
	return (
		<Form>
			<Form.Group>
				<Form.Label>Overskrift</Form.Label>
				<Form.Control
					value={values.textHead}
					placeholder="Velkommen"
					name="textHead"
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Undertittel</Form.Label>
				<Form.Control
					value={values.textP}
					placeholder="Velkommen til vår side"
					name="textP"
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Bilder</Form.Label>
				<Form.Control
					type="file"
					name="files"
					onChange={handleImage}
					accept="image/x-png,image/gif,image/jpeg"
				/>
				<Form.Text className="text-danger">{error('images')}</Form.Text>
			</Form.Group>
			<Row className="w-100">
				{values.newImages ? (
					<Col sm={2}>
						<img
							src={values.newImages.preview[0]}
							alt=""
							className="w-100"></img>
					</Col>
				) : null}
			</Row>
		</Form>
	);
};

export default SlideshowForm;
