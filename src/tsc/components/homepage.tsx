import * as React from "react";

export interface HomeProps { compiler: string; framework: string; }

export class HomeExport extends React.Component<HomeProps, undefined> {
    render() {
        return (
            <div className="🌑🌔">
                <div className="🐉⚡">
                    <img src="/images/me.jpg" width="150" height="150"/>
                    <div className="🤔👾🤔">Phillip Medina</div>
                    <div className="🐉⚡🤔👾🤔">Front End Developer</div>
                </div>
                <div className="🐵❤️️🙈🍋">
                    <div className="🐵❤️️🙈🍋🍇🍇 🐵❤️️🙈🍋__GitHub">
                        <a href="https://github.com/jsmojo" title="GitHub" target="_blank">GitHub</a>
                    </div>
                    <div className="🐵❤️️🙈🍋🍇🍇 🐵❤️️🙈🍋__LinkedIn">
                        <a href="https://www.linkedin.com/in/phillipmedina" title="LinkedIn" target="_blank">LinkedIn</a>
                    </div>
                    <div className="🐵❤️️🙈🍋🍇🍇 🐵❤️️🙈🍋__Facebook">
                        <a href="" title="Facebook" >Facebook</a>
                    </div>
                </div>
            </div>
        );
    }
}

export const Home  = HomeExport;