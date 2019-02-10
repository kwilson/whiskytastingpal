import * as React from 'react'

import './app.scss';

export const App: React.StatelessComponent<{}> = () => (
    <>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Whisky Tasting Pal</h1>
                    <h2 className="subtitle">
                        Because nobody should have to drink alone.
                    </h2>
                </div>
            </div>
        </section>

        <section className="section">
            <form className="container">
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input className="input is-large" type="text" placeholder="Search for a whisky" />
                    </div>
                    <div className="control">
                        <button className="button is-info is-large">
                            Search
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </>
);
