import React, { Component } from 'react';
import './MenuBar.css';
import * as Constants from '../Config/Constants';


class MenuBar extends Component {

    state = {
        queryTemplatesElementHidden: true,
        schemasAndTablesElementHidden: false,
        joinsElementHidden: true,
        columnsElementHidden: true,
        criteriaElementHidden: true,
        otherOptionsElementHidden: true
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">qb4j</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Databases
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.queryTemplatesElementHidden ? "nav-item" : "nav-item active"}
                            onClick={() => this.props.toggleElementVisibilityHandler(Constants.QUERY_TEMPLATES)}
                        >
                            <a className="nav-link" href="#">{Constants.QUERY_TEMPLATES} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.schemasAndTablesElementHidden ? "nav-item" : "nav-item active"}
                            onClick={() => this.props.toggleElementVisibilityHandler(Constants.SCHEMAS_AND_TABLES)}
                        >
                            <a className="nav-link" href="#">{Constants.SCHEMAS_AND_TABLES} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.joinsElementHidden ? "nav-item" : "nav-item active"}
                            onClick={() => this.props.toggleElementVisibilityHandler(Constants.JOINS)}
                        >
                            <a className="nav-link" href="#">{Constants.JOINS} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.columnsElementHidden ? "nav-item" : "nav-item active"}
                            onClick={() => this.props.toggleElementVisibilityHandler(Constants.COLUMNS)}
                        >
                            <a className="nav-link" href="#">{Constants.COLUMNS} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.criteriaElementHidden ? "nav-item" : "nav-item active"}
                            onClick={() => this.props.toggleElementVisibilityHandler(Constants.CRITERIA)}
                        >
                            <a className="nav-link" href="#">{Constants.CRITERIA} <span className="sr-only">(current)</span></a>
                        </li>

                        <hr className="divider"/>

                        <li className={this.state.otherOptionsElementHidden ? "nav-item" : "nav-item active"}
                            onClick={() => this.props.toggleElementVisibilityHandler(Constants.OTHER_OPTIONS)}
                        >
                            <a className="nav-link" href="#">{Constants.OTHER_OPTIONS} <span className="sr-only">(current)</span></a>
                        </li>

                    </ul>

                    <button className="btn btn-outline-primary my-2 my-sm-0"
                            onClick={this.props.runQueryHandler}
                    >
                        Run Query
                    </button>

                    {/*<form className="form-inline my-2 my-lg-0">*/}
                    {/*    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                    {/*    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
                    {/*</form>*/}
                </div>
            </nav>
        );
    }
}

export default MenuBar;
