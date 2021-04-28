import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DropdownSection = ({ section, styling, onSelect }) => {
	return section.map((item, i) => (
		<Col className="text-center" key={i}>
			<Link to={`/leverandør/${item.brand}`} onClick={onSelect}>
				<h5
					className={`m-3 nav-text-color hover-gold ${styling.dropmenuItemHeader}`}>
					{item.brand}
				</h5>
			</Link>
			{item.jacuzzis.map((jacuzzi, j) => (
				<Link to={`/spabad/${jacuzzi._id}`} key={j} onClick={onSelect}>
					<p className={`${styling.dropmenuItem} nav-text-color hover-gold`}>
						{jacuzzi.name}
					</p>
				</Link>
			))}
		</Col>
	));
};

export default DropdownSection;
