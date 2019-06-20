import React from "react";
// import { PromiseProvider } from "mongoose";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
	return (
		<div className="form-flex">
			<input className="form-control" {...props} />
		</div>
	);
}

export function TextArea(props) {
	return (
		<div className="form-flex">
			<textarea className="form-control" rows="20" {...props} />
		</div>
	);
}

export function FormBtn(props) {

	return (
		<button
			{...props}
			style={{ float: "right", height: 30 + "px" }}
			className="icon d-flex"
		>
			<i className="fa fa-search" />
			{props.children}
		</button>

	);
}

export function AutoCompBox(props){
	if(!props.terms){return <div></div>}
	return (
	<div {...props}>
	{props.children}
	</div>

	)
}

export function AutoCompItem(props){
	return(
	<span {...props}>{props.text}</span>
	)
}

