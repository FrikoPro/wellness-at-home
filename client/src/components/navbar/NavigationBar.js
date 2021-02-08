import { useContext, useRef, useState } from 'react';
import { Col, Nav, Navbar, Row } from 'react-bootstrap';
import wellnessLogo from '../../images/wellnessLogo.png';
import styled from 'styled-components';
import { ScrollContext } from '../../contexts/ScrollContext';
import styling from './NavigationBar.module.css';

const NavigationBar = () => {
	const { navbar } = useContext(ScrollContext);

	const [opacity, isCollapsed] = navbar;

	const [open, setOpen] = useState(false);

	const dropdown = useRef(null);

	return (
		<NavBarStyled
			opacity={opacity}
			collapseOnSelect
			expand="lg"
			fixed="top"
			variant="dark"
			className={styling.notOpacity}>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Brand href="/" style={{ height: '45px' }}>
				<img
					className=""
					src={wellnessLogo}
					alt=""
					style={{ height: '100%' }}></img>
			</Navbar.Brand>
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto ml-auto ">
					{/* Had to make a div on top of Nav.Link Spabad to fire the event correctly */}
					<div
						style={{
							position: 'absolute',
							height: '61px',
							width: '61px',
						}}
						onMouseOver={() => setOpen(true)}
						onMouseOut={() => setOpen(false)}></div>
					<Nav.Link
						style={{ zIndex: '1' }}
						onMouseOver={() => setOpen(true)}
						onMouseOut={() => setOpen(false)}
						className={`${styling.navItem} ${styling.hoverGold}`}>
						Spabad
					</Nav.Link>
					<Dropdown
						onMouseOver={() => setOpen(true)}
						onMouseOut={() => setOpen(false)}
						ref={dropdown}
						dropdownref={dropdown}
						iscollapsed={isCollapsed}
						open={open}
						className={`shadow ${styling.dropmenu}`}>
						<Col className="text-center">
							<a href="/svenskabadpro">
								<h5
									className={`m-3 ${styling.hoverGold} ${styling.dropmenuItemHeader}`}>
									Svenska Bad Pro
								</h5>
							</a>
							<a href="/svenskabadpro/viken">
								<p className={`${styling.dropmenuItem} ${styling.hoverGold}`}>
									VIKEN
								</p>
							</a>
							<a href="/svenskabadpro/fjorden">
								<p className={`${styling.dropmenuItem} ${styling.hoverGold}`}>
									FJORDEN
								</p>
							</a>
							<a href="/svenskabadpro/floden">
								<p className={`${styling.dropmenuItem} ${styling.hoverGold}`}>
									FLODEN
								</p>
							</a>
						</Col>
						<Col className={'text-center ' + styling.dropmenuCol}>
							<a href="/svenskabad/">
								<h5
									className={`m-3 ${styling.hoverGold} ${styling.dropmenuItemHeader}`}>
									Svenska Bad
								</h5>
							</a>
							<a href="/svenskabad/earl">
								<p
									className={`mt-2 ${styling.dropmenuItem} ${styling.hoverGold}`}>
									EARL
								</p>
							</a>
							<a href="/svenskabad/vancouver">
								<p
									className={`mt-2 ${styling.dropmenuItem} ${styling.hoverGold}`}>
									VANCOUVER
								</p>
							</a>
							<a href="/svenskabad/vancouver-black-edition">
								<p
									className={`mt-2 ${styling.dropmenuItem} ${styling.hoverGold}`}>
									VANCOUVER BLACK EDITION
								</p>
							</a>
							<a href="/svenskabad/dallas">
								<p
									className={`mt-2 ${styling.dropmenuItem} ${styling.hoverGold}`}>
									DALLAS
								</p>
							</a>
						</Col>
						<Col className={'text-center ' + styling.dropmenuCol}>
							<a href="/nordpool">
								<h5
									className={`m-3 ${styling.hoverGold} ${styling.dropmenuItemHeader}`}>
									Nordpool Spa
								</h5>
							</a>
							<a href="/nordpool/tor">
								<p
									className={`mt-2 ${styling.dropmenuItem} ${styling.hoverGold}`}>
									TOR
								</p>
							</a>
							<a href="/nordpool/sarek">
								<p
									className={`mt-2 ${styling.dropmenuItem} ${styling.hoverGold}`}>
									SAREK
								</p>
							</a>
						</Col>
					</Dropdown>
					<Nav.Link className={`${styling.navItem} ${styling.hoverGold}`}>
						Nettbutikk
					</Nav.Link>
					<Nav.Link
						href="/Nyheter"
						className={`${styling.navItem} ${styling.hoverGold}`}>
						Nyheter
					</Nav.Link>
					<Nav.Link className={`${styling.navItem} ${styling.hoverGold}`}>
						Arrangementer
					</Nav.Link>
					<Nav.Link className={`${styling.navItem} ${styling.hoverGold}`}>
						Support
					</Nav.Link>
				</Nav>
				<Nav>
					<Nav.Link className={`${styling.navItem} ${styling.hoverGold}`}>
						{isCollapsed ? (
							'Search'
						) : (
							<svg
								width="25"
								height="24"
								viewBox="0 0 25 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M13.6503 12.3963L12.4266 12.9638L20.8838 23.1775L23.8113 21.6295L13.6503 12.3963Z"
									fill="white"
									stroke="white"
								/>
								<path
									d="M16.5649 7.0929C16.5649 10.269 13.2907 13.1858 8.78244 13.1858C4.27418 13.1858 1 10.269 1 7.0929C1 3.91685 4.27418 1 8.78244 1C13.2907 1 16.5649 3.91685 16.5649 7.0929Z"
									stroke="white"
									strokeWidth="2"
								/>
							</svg>
						)}
					</Nav.Link>
					<Nav.Link className={`${styling.navItem} ${styling.hoverGold}`}>
						{isCollapsed ? (
							'Handlekurv'
						) : (
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M9 21.75C9 22.992 7.992 24 6.75 24C5.508 24 4.5 22.992 4.5 21.75C4.5 20.508 5.508 19.5 6.75 19.5C7.992 19.5 9 20.508 9 21.75Z"
									fill="white"
								/>
								<path
									d="M24 21.75C24 22.992 22.992 24 21.75 24C20.508 24 19.5 22.992 19.5 21.75C19.5 20.508 20.508 19.5 21.75 19.5C22.992 19.5 24 20.508 24 21.75Z"
									fill="white"
								/>
								<path
									d="M24 12V3H6C6 2.172 5.328 1.5 4.5 1.5H0V3H3L4.1265 12.657C3.4395 13.2075 3 14.052 3 15C3 16.6575 4.3425 18 6 18H24V16.5H6C5.172 16.5 4.5 15.828 4.5 15C4.5 14.9955 4.5 14.9895 4.5 14.985L24 12Z"
									fill="white"
								/>
							</svg>
						)}
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</NavBarStyled>
	);
};

export default NavigationBar;

const NavBarStyled = styled(Navbar)`
	background-color: rgba(0, 0, 0, ${({ opacity }) => opacity});
`;

const Dropdown = styled(Row)`
	max-height: ${({ open, dropdownref }) =>
		open ? dropdownref.current.scrollHeight + 20 + 'px' : '0'};
`;