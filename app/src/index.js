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

  componentDidMount() {
    ;(async () => {
      await this.searchVideo("哈哈")
      this.setState({
        search_input_type: "1",
      })
    })()
  }

  searchVideo(q) {
    return new Promise((resolve, reject) => {
      if (q) {
        axios
          .get(config.videoSearchUrl, {
            params: {
              q,
            },
          })
          .then((res) => {
            console.log("res ", res)
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
    return (
      <Fragment>
        <SearchInput
          value={this.state.search_value}
          type={this.state.search_input_type}
          onSearch={async (value) => {
            await this.searchVideo(value)
            this.setState({
              search_input_type: "1",
            })
          }}
          onInput={(value) => {
            console.log("input ", value)
            this.setState({
              search_value: value,
            })
          }}
        />

        {this.state.search_res.map((item, index) => {
          return (
            <Fragment key={item.key}>
              <SearchTitle title={item.key} img={item.logo} />
              {item.list.map((data, idx) => {
                return <SearchItem data={data} key={item.key + idx} />
              })}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
