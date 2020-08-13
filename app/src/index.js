import React, { Component, Fragment } from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import { SearchInput, SearchTitle, SearchItem } from "./components"
import axios from "axios"
import config from "./config"

class App extends Component {
  constructor() {
    super()
    this.state = {
      search_input_type: "0",
      search_value: "",
      search_res: [],
    }
  }

  componentDidMount() {}

  searchVideo(q, size = 10) {
    return new Promise((resolve, reject) => {
      if (q) {
        axios
          .get(config.videoSearchUrl, {
            params: {
              q,
              size,
            },
          })
          .then((res) => {
            if (res && res.status === 200) {
              this.setState({
                search_res: res.data,
              })
              resolve()
            }
          })
          .catch((err) => {
            console.log("err ", err)
            reject()
          })
      } else {
        resolve()
      }
    })
  }

  render() {
    const renderSearchList = () => {
      return (
        <section className="search-list-outer">
          {this.state.search_res.map((item, index) => {
            return (
              <div className="search-res-item" key={item.key}>
                <SearchTitle title={item.key} img={item.logo} />
                <div className="search-list">
                  {item.list.map((data, idx) => {
                    return (
                      <SearchItem
                        data={data}
                        search_q={this.state.search_value}
                        key={item.key + idx}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      )
    }

    return (
      <Fragment>
        <SearchInput
          value={this.state.search_value}
          type={this.state.search_input_type}
          onSearch={async (value) => {
            this.setState({
              search_res:[]
            })

            await this.searchVideo(value)
            this.setState({
              search_input_type: "1",
            })
          }}
          onInput={(value) => {
            this.setState({
              search_value: value,
            })
          }}
        />
        {renderSearchList()}
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
