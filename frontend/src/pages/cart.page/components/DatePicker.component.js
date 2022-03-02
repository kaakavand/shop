import React, { Component } from "react";
import moment from "jalali-moment";

export default class DatePicker extends Component {
    render() {
        return (
            <div>
                {this.props.data.map((post, key) => (
                    <div key={key} className="post-detail">
                        <h1>{post.title}</h1>
                        <p>
                            {moment(post.date, "YYYY/MM/DD")
                                .locale("fa")
                                .format("YYYY/MM/DD")}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}
