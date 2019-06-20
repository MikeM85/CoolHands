import React from "react";

const ProfileCard = props => {
  return (
    <div className="card d-flex flex-row">
      <div className="img-wrap d-flex justify-content-center">
        <img className="userpicsize" id={props.id} alt={props.id} src={props.imageurl} />
      </div>
      <div
        className="main-content d-flex flex-column justify-content-between"
        style={{ flex: 1, marginLeft: 5 }}
      >
        <div className="d-flex flex-row row1">
          <div style={{ flex: 1 }}>
            <h1 className="titlename">{props.name}</h1>
          </div>

          <div
            className="d-flex flex-row justify-content-md-end muted"
            style={{ flex: 1 }}
          >
            <button className={props.className} userid={props.id} onClick={props.follow}>{props.isFollowing}</button>
          </div>
        </div>
        <div className="numberof">
          <h5>Number of Followers: {props.followers}</h5>
          <h5>Number of Reviews:  {props.reviews}</h5>
          <h5 className="muted">Location:  {props.location}</h5>
        </div>

      </div>
      <p />
    </div>
  );
};

export default ProfileCard;

//removed so the page wouldn't break while designing

// placeholder="Name"
// name="name"
// type="name"
// value={this.state.name}
// onChange={this.onChange}
// error={errors.name}
