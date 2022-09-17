import React from 'react';

export class FooterComponent extends React.Component {
	render() {
		return (
			<footer id={this.props.id}>
				<section id="footer-header">
					<h3>Top companies chose <span>Udemy Business</span> to build in-demand career skills.</h3>
					<section id="footer-images">
						<img src={`${process.env.PUBLIC_URL}/assets/images/nasdaq-logo.svg`} alt="nasdaq logo"/>
						<img src={`${process.env.PUBLIC_URL}/assets/images/volks-logo.svg`} alt="volks logo"/>
						<img src={`${process.env.PUBLIC_URL}/assets/images/box-logo.svg`} alt="box logo"/>
						<img src={`${process.env.PUBLIC_URL}/assets/images/netapp-logo.svg`} alt="netapp logo"/>
						<img src={`${process.env.PUBLIC_URL}/assets/images/eventbrite-logo.svg`}
						     alt="eventbrite logo"/>
					</section>
				</section>
				<section id="footer-links">
					<ul>
						<li><span>Udemy Business</span></li>
						<li><span>Teach on Udemy</span></li>
						<li><span>Get the app</span></li>
						<li><span>About us</span></li>
						<li><span>Contact us</span></li>
					</ul>
					<ul>
						<li><span>Careers</span></li>
						<li><span>Blog</span></li>
						<li><span>Help and support</span></li>
						<li><span>Affiliate</span></li>
						<li><span>Investors</span></li>
					</ul>
					<ul>
						<li><span>Terms</span></li>
						<li><span>Privacy Policy</span></li>
						<li><span>Cookie settings</span></li>
						<li><span>Site map</span></li>
						<li><span>Accessibility statement</span></li>
					</ul>
				</section>
				<section id="footer-copyrights">
					<img src={`${process.env.PUBLIC_URL}/assets/images/udemyfooter-logo.svg`} alt="udemy logo"/>
					<span>&copy; 2022 Udemy, Inc.</span>
				</section>
			</footer>
		);
	}
}