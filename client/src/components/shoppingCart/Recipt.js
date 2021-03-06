import axios from 'axios';
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import PriceFormatter from '../PriceFormatter';

const Recipt = ({ recipt, emptyRecipt }) => {
	useEffect(() => {
		axios
			.post('/sendmail/recipt', recipt)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err.response));

		return () => emptyRecipt();
	}, [recipt]);

	return (
		<Container id="recipt">
			<Card>
				<Card.Body>
					<Card.Title>
						Takk for ditt kjøp {recipt.firstName} {recipt.lastName}
					</Card.Title>
					{recipt.cart.map((item, i) => (
						<Row className="margin-bottom-line pb-2" key={i}>
							<Col sm={2} xs={2}>
								<Card.Img src={`/${item.images[0].image}`} />
							</Col>
							<Col>
								<Card.Title>
									{item.name} ({item.qty} stk)
								</Card.Title>
								<Card.Text>{item.aboutProduct}</Card.Text>
							</Col>
							<Col className="text-right">
								{PriceFormatter(item.qty * item.price)}
							</Col>
						</Row>
					))}
					<Row>
						<Col className="text-right mt-4">
							{PriceFormatter(recipt.totalPrice)}
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Recipt;
