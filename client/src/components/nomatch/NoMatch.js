import React from "react";
import { Col, Row, Container } from "../grid";

function NoMatch() {
	return (
		<Container fluid>
			<Row>
				<Col size="md-12">
					<div className="jumbotron text-center">
						<h1>404 Page Not Found</h1>
						<h1>
							<span role="img" aria-label="Shrug Emoji">
								🤷‍‍♀️
							</span>
						</h1>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default NoMatch;
