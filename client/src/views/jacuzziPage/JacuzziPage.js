import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ScrollDiv from '../../components/scrolldiv/ScrollDiv';
import Slideshow from '../../components/Slideshow';

import styles from './JacuzziPage.module.css';
import StarRating from '../../components/StarRating';
import UserReviewList from '../../components/UserReview/UserReviewList';

import { JacuzziContext } from '../../contexts/JacuzziContext';
import { ProductsContext } from '../../contexts/ProductsContext';
import TechSpec from '../../components/TechSpec';
import PriceFormatter from '../../components/PriceFormatter';
import UseForm from '../../components/webpanel/UseForm';
import { LoggedInContext } from '../../contexts/LoggedInContext';

const JacuzziPage = () => {
	let { id } = useParams();

	const { jacuzzis } = useContext(JacuzziContext);

	const { products } = useContext(ProductsContext);

	const loggedIn = useContext(LoggedInContext);

	const { updateData, removeValues, setValues, values } = UseForm({
		url: 'http://localhost:8080/jacuzzis/',
		initialValues: { relatedProducts: [], userReviews: [] },
	});

	const [averageRating, setAverageRating] = useState(0);

	useEffect(() => {
		let tempObj = jacuzzis.find((product) => product._id === id);

		if (tempObj !== undefined) {
			const sum = (acc, val) => acc.rating + val.rating;

			if (tempObj.userReviews.length > 0) {
				if (tempObj.userReviews.length > 1) {
					setAverageRating(
						Math.round(
							tempObj.userReviews.reduce(sum) / tempObj.userReviews.length
						)
					);
				} else {
					setAverageRating(tempObj.userReviews[0].rating);
				}
			}

			let productsFiltered = products.filter((item) =>
				tempObj.relatedProducts.includes(item._id)
			);

			productsFiltered = productsFiltered.map((item) => ({
				image: item.images[0].image,
				textHead: item.name,
			}));

			tempObj.relatedProducts = productsFiltered;
		}

		setValues(tempObj);
	}, [jacuzzis, id, products]);

	const [activeSlideImg, setActiveSlideImg] = useState(0);

	const reviewsRef = useRef(null);

	return values ? (
		<Container className="shadow p-5 bg-white">
			<section>
				<Row>
					<Col sm={12} className="mx-auto">
						<Slideshow
							classId="productPage"
							interval={null}
							indicators={false}
							slideContent={values.images}
							styling={styles}
							activeIndex={activeSlideImg}
							setIndex={(index) => setActiveSlideImg(index)}
						/>
					</Col>
				</Row>
				<ScrollDiv
					content={values.images}
					returnFunction={(index) => setActiveSlideImg(index)}
					size={2}
				/>
			</section>
			<section>
				<Row className="justify-content-center align-items-center p-5">
					<Col className={`text-center margin-bottom-line`}>
						<h1>{values.name ? values.name.toUpperCase() : null}</h1>
					</Col>
				</Row>
				<Row className="justify-content-between">
					<Col sm={12} lg={6} className="mx-auto p-5 text-center">
						<p>{values.aboutProduct}</p>
					</Col>
					<Col sm={12} lg={6} className="text-center align-self-center">
						<h1 className="mb-3">{PriceFormatter(values.price)}</h1>
						{values.userReviews.length > 0 ? (
							<>
								<StarRating rating={averageRating} size={2} />
								<p
									className="mb-3 text-secondary"
									style={{ cursor: 'pointer' }}
									onClick={() => reviewsRef.current.scrollIntoView(false)}>
									<u>
										Se anmeldelser (
										{values.userReviews !== undefined
											? values.userReviews.length
											: 0}
										)
									</u>
								</p>
							</>
						) : null}
						<Button className="btn-warning mb-sm-3">
							Interessert? Ta kontakt
						</Button>
						<Button 
							href={`/Sammenlign/${id}`}
							className="ml-3 mb-sm-3">Sammenlign</Button>
					</Col>
				</Row>
			</section>
			<TechSpec techSpec={values.techSpec} removeValues={removeValues} />
			{values.relatedProducts.length > 0 ? (
				<section>
					<Row className="justify-content-center align-items-center mt-5 p-5">
						<Col className={`text-left margin-bottom-line`}>
							<h1>Relatert tilbehør</h1>
						</Col>
					</Row>
					<ScrollDiv content={values.relatedProducts} size={3} />
				</section>
			) : null}

			{values.userReviews.length > 0 ? (
				<section ref={reviewsRef}>
					<Row className="justify-content-center align-items-center mt-5 p-5">
						<Col className={`text-left margin-bottom-line`}>
							<h1>Anmeldelser</h1>
						</Col>
					</Row>
					<UserReviewList
						userReviews={values.userReviews}
						onDelete={removeValues}
					/>
				</section>
			) : null}

			{loggedIn ? <Button onClick={updateData}>Lagre</Button> : null}
		</Container>
	) : (
		<div
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}>
			<h1>Finner ikke dette spabadet</h1>
		</div>
	);
};

export default JacuzziPage;
