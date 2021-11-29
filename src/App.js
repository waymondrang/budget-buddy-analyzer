import './App.css';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      method: "date",
      primary_param: "",
      locations: [],
      filter: {
        location: ""
      },
      version: "",
      debug: new URLSearchParams(window.location.search).has("debug"),
      data: [],
      filtered_data: []
    }

    this.sortBy = this.sortBy.bind(this);
    this.onLocationFilterChange = this.onLocationFilterChange.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    const self = this;
    if (this.state.debug) {
      var locations = [];
      var version = "Debug";
      var data = [{ "account": "Dining Dollars", "amount": 11.25, "date": "2021-09-20T19:18:00.000Z", "id": "6dc9538f-4901-4540-a845-22e2b0493b99", "location": "HDH 64 Degrees 64-Wok Mobile Ordering", "time": "12:18 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 10.25, "date": "2021-09-20T00:12:00.000Z", "id": "4c0dcf60-0101-4441-b699-0b224f594d99", "location": "HDH 64 Degrees 64-Taqueria Mobile Ordering", "time": "5:12 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 5, "date": "2021-09-19T18:29:00.000Z", "id": "c45f6ea0-232a-42e5-83e1-c2ff7cb55993", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "11:29 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-09-19T00:42:00.000Z", "id": "b3e35996-c3da-4e1a-8d5f-4b113c2f8422", "location": "HDH North Torrey Pines NTP Wolftown Mobile Ordering", "time": "5:42 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-09-18T01:19:00.000Z", "id": "bb3b7465-601f-432b-b721-941dd2ddc116", "location": "HDH Oceanview Terrace OVT Scholars Pizza Mobile", "time": "6:19 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 3749, "date": "2021-09-10T17:47:00.000Z", "id": "70456475-cc21-4ff3-af1b-58b68cadc33c", "location": "Triton Card Accounts Services HDH-R-APP-AD", "time": "10:47 AM", "type": "Credit" }];
      for (var transaction of data) {
        if (!locations.includes(transaction["location"])) {
          locations.push(transaction["location"]);
        }
      }
      self.setState({
        data: data,
        version: version,
        filtered_data: data,
        locations: locations
      })
      return
    }
    try {
      window.chrome.storage.local.get(['data'], function (result) {
        var data = result["data"];
        var version = window.chrome.runtime.getManifest().version;
        if (!data) {
          console.log("no data found!");
          return;
        }
        var locations = [];
        for (var transaction of data) {
          if (!locations.includes(transaction["location"])) {
            locations.push(transaction["location"]);
          }
        }
        self.setState({
          data: data,
          version: version,
          filtered_data: data,
          locations: locations
        })
      })
    } catch (e) {
      console.log(e);
    }
  }

  sortBy(e, method) {
    var primary_param = this.state.primary_param;
    var data = this.state.filtered_data;
    if (e.ctrlKey) {
      console.log("ctrl click registered to method", method, "condition", method === this.state.primary_param);
      if (method === this.state.primary_param) {
        primary_param = "";
        this.setState({
          primary_param: ""
        })
      } else {
        primary_param = method;
        this.setState({
          primary_param: method
        })
      }
    }
    if (method === "amount") {
      var sorted = data.sort(function (a, b) {
        if (primary_param === "time") {
          var date_a = new Date(Date.parse(a["date"]));
          var date_b = new Date(Date.parse(b["date"]));
        }
        return primary_param === "date" ? Date.parse(b["date"]) - Date.parse(a["date"]) || b["amount"] - a["amount"] : primary_param === "time" ? ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) || b["amount"] - a["amount"] : primary_param === "account" ? a["account"].localeCompare(b["account"]) || b["amount"] - a["amount"] : primary_param === "location" ? a["location"].localeCompare(b["location"]) || b["amount"] - a["amount"] : primary_param === "type" ? a["type"].localeCompare(b["type"]) || b["amount"] - a["amount"] : b["amount"] - a["amount"];
      })
      this.setState({
        filtered_data: sorted,
        method: method
      })
    } else if (method === "date") {
      var sorted = data.sort(function (a, b) {
        if (primary_param === "time") {
          var date_a = new Date(Date.parse(a["date"]));
          var date_b = new Date(Date.parse(b["date"]));
        }
        return primary_param === "amount" ? b["amount"] - a["amount"] || Date.parse(b["date"]) - Date.parse(a["date"]) : primary_param === "time" ? ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) || Date.parse(b["date"]) - Date.parse(a["date"]) : primary_param === "account" ? a["account"].localeCompare(b["account"]) || Date.parse(b["date"]) - Date.parse(a["date"]) : primary_param === "location" ? a["location"].localeCompare(b["location"]) || Date.parse(b["date"]) - Date.parse(a["date"]) : primary_param === "type" ? a["type"].localeCompare(b["type"]) || Date.parse(b["date"]) - Date.parse(a["date"]) : Date.parse(b["date"]) - Date.parse(a["date"]);
      })
      this.setState({
        filtered_data: sorted,
        method: method
      })
    } else if (method === "time") {
      var sorted = data.sort(function (a, b) {
        var date_a = new Date(Date.parse(a["date"]));
        var date_b = new Date(Date.parse(b["date"]));
        return primary_param === "amount" ? b["amount"] - a["amount"] || ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) : primary_param === "date" ? Date.parse(b["date"]) - Date.parse(a["date"]) || ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) : primary_param === "account" ? a["account"].localeCompare(b["account"]) || ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) : primary_param === "location" ? a["location"].localeCompare(b["location"]) || ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) : primary_param === "type" ? a["type"].localeCompare(b["type"]) || ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) : ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24));

      });
      this.setState({
        filtered_data: sorted,
        method: method
      })
    } else if (method === "account") {
      var sorted = data.sort(function (a, b) {
        if (primary_param === "time") {
          var date_a = new Date(Date.parse(a["date"]));
          var date_b = new Date(Date.parse(b["date"]));
        }
        return primary_param === "amount" ? b["amount"] - a["amount"] || a["account"].localeCompare(b["account"]) : primary_param === "time" ? ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) || a["account"].localeCompare(b["account"]) : primary_param === "date" ? Date.parse(b["date"]) - Date.parse(a["date"]) || a["account"].localeCompare(b["account"]) : primary_param === "location" ? a["location"].localeCompare(b["location"]) || a["account"].localeCompare(b["account"]) : primary_param === "type" ? a["type"].localeCompare(b["type"]) || a["account"].localeCompare(b["account"]) : a["account"].localeCompare(b["account"]);
      })
      this.setState({
        filtered_data: sorted,
        method: method
      })
    } else if (method === "location") {
      var sorted = data.sort(function (a, b) {
        if (primary_param === "time") {
          var date_a = new Date(Date.parse(a["date"]));
          var date_b = new Date(Date.parse(b["date"]));
        }
        return primary_param === "amount" ? b["amount"] - a["amount"] || a["location"].localeCompare(b["location"]) : primary_param === "time" ? ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) || a["location"].localeCompare(b["location"]) : primary_param === "date" ? Date.parse(b["date"]) - Date.parse(a["date"]) || a["account"].localeCompare(b["account"]) : primary_param === "account" ? a["account"].localeCompare(b["account"]) || a["location"].localeCompare(b["location"]) : primary_param === "type" ? a["type"].localeCompare(b["type"]) || a["location"].localeCompare(b["location"]) : a["location"].localeCompare(b["location"]);
      })
      this.setState({
        filtered_data: sorted,
        method: method
      })
    }
    else if (method === "type") {
      var sorted = data.sort(function (a, b) {
        if (primary_param === "time") {
          var date_a = new Date(Date.parse(a["date"]));
          var date_b = new Date(Date.parse(b["date"]));
        }
        return primary_param === "amount" ? b["amount"] - a["amount"] || a["type"].localeCompare(b["type"]) : primary_param === "time" ? ((date_a - (date_a.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) - ((date_b - (date_b.getTimezoneOffset() * 60 * 1000)) % (1000 * 60 * 60 * 24)) || a["type"].localeCompare(b["type"]) : primary_param === "date" ? Date.parse(b["date"]) - Date.parse(a["date"]) || a["type"].localeCompare(b["type"]) : primary_param === "location" ? a["location"].localeCompare(b["location"]) || a["type"].localeCompare(b["type"]) : primary_param === "account" ? a["account"].localeCompare(b["account"]) || a["type"].localeCompare(b["type"]) : a["type"].localeCompare(b["type"]);
      })
      this.setState({
        filtered_data: sorted,
        method: method
      })
    }
    console.log("primary parameter", primary_param);
  }

  onLocationFilterChange(e) {
    var filter = this.state.filter;
    filter["location"] = e.target.value;
    this.setState({
      filter: filter
    })
  }

  applyFilter(e) {
    console.log("applying filter", this.state.filter);
    if (this.state.filter["location"]) {
      if (this.state.filter["location"] === "bb_all_locations") {
        this.setState({
          filtered_data: this.state.data
        })
      } else {
        var data = this.state.data.filter(e => e["location"] === this.state.filter["location"]);
        this.setState({
          filtered_data: data
        })
      }
    }
  }

  render() {
    return (
      <div id="main">
        <h1 id="title">Budget Buddy Analyzer{this.state.debug ? "\ Debug Mode" : ""}</h1>
        <p>Ctrl + Click on a header field to set it as the primary sort parameter.</p>
        <div className="options">
          <select className="option" value={this.state.filter["location"]} onChange={this.onLocationFilterChange}>
            <option key="bb_default" value="" disabled>Select Location</option>
            <option key="bb_all_locations" value="bb_all_locations">All Locations</option>
            {this.state.locations.map(e =>
              <option key={e} value={e}>{e}</option>
            )}
          </select>
          <button className="option" onClick={this.applyFilter}>Filter</button>
        </div>
        <div className="table_container">
          <table>
            <thead>
              <tr className="table_header">
                <th className={this.state.method === "location" && this.state.primary_param === "location" ? "selected primary" : this.state.primary_param === "location" ? "primary" : this.state.method === "location" ? "selected" : null} onClick={(e) => this.sortBy(e, "location")}>Location</th>
                <th className={this.state.method === "amount" && this.state.primary_param === "amount" ? "selected primary" : this.state.primary_param === "amount" ? "primary" : this.state.method === "amount" ? "selected" : null} onClick={(e) => this.sortBy(e, "amount")}>Amount</th>
                <th className={this.state.method === "account" && this.state.primary_param === "account" ? "selected primary" : this.state.primary_param === "account" ? "primary" : this.state.method === "account" ? "selected" : null} onClick={(e) => this.sortBy(e, "account")}>Account</th>
                <th className={this.state.method === "date" && this.state.primary_param === "date" ? "selected primary" : this.state.primary_param === "date" ? "primary" : this.state.method === "date" ? "selected" : null} onClick={(e) => this.sortBy(e, "date")}>Date</th>
                <th className={(this.state.method === "date" && this.state.primary_param === "date" ? "selected primary" : this.state.primary_param === "date" ? "primary" : this.state.method === "date" ? "selected" : null) || (this.state.method === "time" && this.state.primary_param === "time" ? "selected primary" : this.state.primary_param === "time" ? "primary" : this.state.method === "time" ? "selected" : null)} onClick={(e) => this.sortBy(e, "time")}>Time</th>
                <th className={this.state.method === "type" && this.state.primary_param === "type" ? "selected primary" : this.state.primary_param === "type" ? "primary" : this.state.method === "type" ? "selected" : null} onClick={(e) => this.sortBy(e, "type")}>Type</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filtered_data.map(e =>
                <tr key={e.id}>
                  <td>{e.location}</td>
                  <td>${e.amount}</td>
                  <td>{e.account}</td>
                  <td>{new Date(Date.parse(e.date)).toLocaleDateString()}</td>
                  <td>{new Date(Date.parse(e.date)).toLocaleTimeString()}</td>
                  <td>{e.type}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div id="footer">
          <p>Budget Buddy ({this.state.version}) by Raymond Wang</p>
          <p>{this.state.filtered_data.length} {this.state.filtered_data.length != 1 ? "Transactions" : "Transaction"}</p>
        </div>
      </div>
    )
  }
}
