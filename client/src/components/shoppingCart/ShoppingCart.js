import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { ProductsContext } from '../../contexts/ProductsContext';
import QtySelector from './QtySelector';
import PriceFormatter from '../PriceFormatter';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
	const [shoppedItems, setItems] = useState([]);

	const { cart, updateCart, totalPrice } = useContext(ProductsContext);

	useEffect(() => {
		setItems([...cart]);
	}, [cart]);

	const setQty = (val, id) => {
		const index = shoppedItems.findIndex((item) => item._id === id);

		let items = shoppedItems;

		if (val === '') {
			items[index].qty = val;
		} else if (val < 1 || val > 999) return;
		else {
			items[index].qty = parseInt(val);
		}

		updateCart(items);
	};

	const removeItem = (index) => {
		const tempArray = shoppedItems;

		const tempStorage = JSON.parse(localStorage.getItem('shoppedItems'));

		tempStorage.splice(index, 1);

		localStorage.setItem('shoppedItems', JSON.stringify(tempStorage));

		tempArray.splice(index, 1);

		updateCart(tempArray);
	};

	return shoppedItems.length > 0 ? (
		<Container fluid="md">
			<Row>
				<Col>
					<h1>Handlevogn</h1>
				</Col>
			</Row>
			<Row className="d-none d-sm-block">
				<Col md={11}>
					<Row>
						<Col
							sm={{ span: 4, offset: 6 }}
							lg={{ span: 1, offset: 6 }}
							className="text-center">
							Antall
						</Col>
						<Col lg={3} className="text-center d-sm-none d-lg-block">
							Pris
						</Col>
						<Col>Totalt</Col>
					</Row>
				</Col>
			</Row>

			{shoppedItems.map((item, i) => (
				<Row key={i}>
					<Col md={11}>
						<Card className="mb-4">
							<Card.Body>
								<Row>
									<Col sm={2} xs={2} md={2} lg={2}>
										<Card.Img src={item.images[0].image} />
									</Col>
									<Col xs={10} sm={5} lg={3}>
										<Card.Title>{item.name}</Card.Title>
										<Card.Text>{item.aboutProduct}</Card.Text>
									</Col>
									<QtySelector item={item} handleUpdate={setQty} />
									<Col
										lg={2}
										style={{ whiteSpace: 'nowrap' }}
										className="text-center d-none d-lg-block">
										{PriceFormatter(item.price)}
									</Col>
									<Col
										sm={2}
										xs={7}
										lg={2}
										className="mt-5 mt-sm-0 text-center text-sm-left">
										<span style={{ whiteSpace: 'nowrap' }}>
											{PriceFormatter(item.price * item.qty)}
										</span>
									</Col>
									<Col
										xs={2}
										sm={12}
										className="text-right d-md-none mt-5 mt-sm-0">
										<Button variant="danger" onClick={() => removeItem(i)}>
											X
										</Button>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Col>
					<Col md={1} className="m-0 d-none d-md-block">
						<Button variant="danger" onClick={() => removeItem(i)}>
							X
						</Button>
					</Col>
				</Row>
			))}

			<Row>
				<Col md={{ span: 3, offset: 8 }} className="text-right">
					Total sum varer: {PriceFormatter(totalPrice)}
				</Col>
			</Row>
			<Row>
				<Col md={{ span: 3, offset: 8 }} className="text-right mt-4">
					<Button as={Link} variant="warning" to="/handlekurv/kassen">
						Gå til kassen
					</Button>
				</Col>
			</Row>
		</Container>
	) : (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}>
			<h1>handlevognen er tom</h1>
		</div>
	);
};

export default ShoppingCart;
