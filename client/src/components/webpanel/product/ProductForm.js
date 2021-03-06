import { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { ProductsContext } from '../../../contexts/ProductsContext';
import SelectAddText from '../SelectAddText';
import TableList from '../../TableList';
import UserForm from '../UserForm';

const ProductForm = ({ returnErrors, userInput }) => {
	const { categories, techSpec } = useContext(ProductsContext);

	const {
		values,
		removeValues,
		handleEvent,
		handleChange,
		shiftOrder,
	} = userInput;

	const [serie, setSerie] = useState('');

	const [bath, setBath] = useState('');

	return (
		<Form>
			<Form.Label>Velg tilhørighet</Form.Label>
			<Form.Group>
				<TableList
					values={values.affiliation}
					name="affiliation"
					removeValue={removeValues}
					shiftOrder={shiftOrder}
				/>
				<Row>
					<Col>
						<Form.Control
							placeholder="Serie"
							onChange={(e) => setSerie(e.target.value)}
						/>
					</Col>
					<Col sm={5}>
						<Form.Control
							placeholder="Bad"
							onChange={(e) => setBath(e.target.value)}
						/>
					</Col>
					<Col sm={1} className="text-sm-right text-center mt-3 mt-sm-0">
						<Button
							onClick={() =>
								handleEvent('affiliation', [
									...values.affiliation,
									{ serie: serie, bad: bath },
								])
							}
							variant="success">
							Legg til
						</Button>
					</Col>
				</Row>
			</Form.Group>
			<Form.Group>
				<Form.Label>Kategori</Form.Label>
				<SelectAddText
					options={categories}
					value={values.category}
					errors={returnErrors}
					handleChange={handleChange}
					name="category"
				/>
				<Form.Text className="text-danger">
					{returnErrors('category')}
				</Form.Text>
			</Form.Group>
			<UserForm
				returnErrors={returnErrors}
				{...userInput}
				techSpec={techSpec}
			/>
		</Form>
	);
};

export default ProductForm;
