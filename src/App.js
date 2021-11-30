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
      var data = [{ "account": "Dining Dollars", "amount": 12.59, "date": "2021-11-29T18:35:00.000Z", "id": "17904c9c-c3cd-41dd-abe4-fb96aabbad31", "location": "HDH Seventh Market Seventh Market 3", "time": "10:35 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-11-27T16:50:00.000Z", "id": "2632cf59-8dfb-42da-b5bb-df051a9b60d3", "location": "Laundry Village Building 3 Left", "time": "8:50 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-11-27T16:50:00.000Z", "id": "8a5db0c2-3cd9-4792-b62d-6746fc29a2f4", "location": "Laundry Village Building 3 Left", "time": "8:50 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-11-27T15:53:00.000Z", "id": "407d15da-6588-4d58-bdd3-5e89cae2be07", "location": "Laundry Village Building 3 Left", "time": "7:53 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-11-27T15:52:00.000Z", "id": "94bed0e2-0d56-49bc-a309-c5b289af8514", "location": "Laundry Village Building 3 Left", "time": "7:52 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 13.08, "date": "2021-11-25T17:58:00.000Z", "id": "86f8839a-1d14-4fe0-9b8b-e59216ebb2bc", "location": "HDH Sixth Market NTP NTP Sixth Market Grocery 2", "time": "9:58 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 19, "date": "2021-11-24T22:57:00.000Z", "id": "47e169a1-9969-409f-adff-38dcdc848bba", "location": "HDH Seventh Market Seventh Market 3", "time": "2:57 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7.9, "date": "2021-11-23T17:32:00.000Z", "id": "2e89ca54-d277-447c-a6d9-5bf9cea9b279", "location": "HDH Seventh Market Seventh Market 3", "time": "9:32 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.8, "date": "2021-11-22T16:57:00.000Z", "id": "a8b0f70d-f394-4f52-909d-e9ce4faf3dc5", "location": "HDH Seventh Market Seventh Market 3", "time": "8:57 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-11-21T04:02:00.000Z", "id": "fe20ea45-e53a-4375-9414-4c24841d6fca", "location": "Laundry Village Building 3 Left", "time": "8:02 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-11-21T03:03:00.000Z", "id": "8a2e04c3-721d-47f9-93aa-e597b71e7972", "location": "Laundry Village Building 3 Left", "time": "7:03 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-11-20T00:11:00.000Z", "id": "ac7ff3e0-924e-4c28-8b69-d9b2367d9e81", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "4:11 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 5.1, "date": "2021-11-19T00:09:00.000Z", "id": "e5030738-bbda-4749-b30b-2f49372c7b00", "location": "HDH Seventh Market Seventh Market 3", "time": "4:09 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.9, "date": "2021-11-18T16:09:00.000Z", "id": "97b77751-2698-47b1-9553-2e35eadafee5", "location": "HDH Seventh Market Seventh Market 3", "time": "8:09 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.6, "date": "2021-11-16T21:02:00.000Z", "id": "f372aac6-4dff-4f01-a8ce-8daf6f8d1eda", "location": "HDH Seventh Market Seventh Market 3", "time": "1:02 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 14.99, "date": "2021-11-16T01:35:00.000Z", "id": "3d1a0343-e2d3-4c6e-b2ae-2696f5726850", "location": "HDH Seventh Market Seventh Market 3", "time": "5:35 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 28.24, "date": "2021-11-15T18:29:00.000Z", "id": "98e47158-6879-470e-a048-bd79a50efb8e", "location": "HDH Sixth Market NTP NTP Sixth Market Coffee 2", "time": "10:29 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.75, "date": "2021-11-15T02:55:00.000Z", "id": "764a68cf-5f7c-4da9-bd70-85df1b5a8330", "location": "HDH Seventh Market Seventh Market 3", "time": "6:55 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 20.13, "date": "2021-11-15T00:35:00.000Z", "id": "0bc3078d-90f5-4d7e-9a8c-6d5708ce301b", "location": "HDH Seventh Market Seventh Market 2", "time": "4:35 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 3.79, "date": "2021-11-13T00:33:00.000Z", "id": "90335e67-cf8a-44a2-9f1e-9f71c5b462a5", "location": "HDH Seventh Market Seventh Market 2", "time": "4:33 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7.2, "date": "2021-11-12T23:39:00.000Z", "id": "14172bf5-b0ea-4250-a8a7-c20804bdbb6f", "location": "HDH Sixth Market NTP NTP Sixth Market Grocery 2", "time": "3:39 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 14.04, "date": "2021-11-12T20:39:00.000Z", "id": "71de942d-fe5a-41e8-9894-a6cdf5fc9a67", "location": "HDH Seventh Market Seventh Market 3", "time": "12:39 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-11-12T19:30:00.000Z", "id": "2a2027a1-a7d6-465b-ac64-430f8530b78d", "location": "Laundry Village Building 3 Left", "time": "11:30 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-11-12T18:31:00.000Z", "id": "e6a5bf75-5cff-4e5d-87cf-94dac747587a", "location": "Laundry Village Building 3 Left", "time": "10:31 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 24.48, "date": "2021-11-11T17:21:00.000Z", "id": "52014d5a-72f1-4d73-827b-484e8e721680", "location": "HDH Seventh Market Seventh Market 3", "time": "9:21 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 16.14, "date": "2021-11-10T18:18:00.000Z", "id": "aa499332-5364-496a-85af-b51e3a9a6d77", "location": "HDH Sixth Market NTP NTP Sixth Market Coffee 2", "time": "10:18 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.45, "date": "2021-11-09T04:31:00.000Z", "id": "7d13766e-a9a6-459f-8226-dc4a0588f44d", "location": "HDH Seventh Market Seventh Market 2", "time": "8:31 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-11-09T04:01:00.000Z", "id": "e0b255f6-6a21-4737-8c64-a35276f9a8cd", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "8:01 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-11-09T03:50:00.000Z", "id": "244c1c7b-38bd-47b3-bb35-9418b600e163", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "7:50 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 11.75, "date": "2021-11-07T03:04:00.000Z", "id": "b8ff9900-1f31-41a5-ab9d-27f858b8767d", "location": "HDH Seventh Market Seventh Market 3", "time": "8:04 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7.13, "date": "2021-11-06T00:54:00.000Z", "id": "14880653-8eff-4800-b862-8355e8dec0ad", "location": "HDH Seventh Market Seventh Market 3", "time": "5:54 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 5.95, "date": "2021-11-05T20:04:00.000Z", "id": "7e0223b6-bec0-4cba-9a89-cbaacd3486a8", "location": "HDH Seventh Market Seventh Market 3", "time": "1:04 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-11-05T07:14:00.000Z", "id": "e13f4385-70f8-486a-85e9-27d2e8e7b26f", "location": "Laundry Village Building 3 Left", "time": "12:14 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-11-05T06:08:00.000Z", "id": "12f41d74-38bf-448c-9fac-4774e7f57120", "location": "Laundry Village Building 3 Left", "time": "11:08 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-11-05T06:08:00.000Z", "id": "6700f88c-6488-4615-bd30-8fe21c715df5", "location": "Laundry Village Building 3 Left", "time": "11:08 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 2.55, "date": "2021-11-05T00:53:00.000Z", "id": "9debbcda-35eb-4ba2-ad59-d6b977513ed8", "location": "HDH Sixth Market NTP NTP Sixth Market Grocery 2", "time": "5:53 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 11.85, "date": "2021-11-04T22:23:00.000Z", "id": "075551b5-8e59-442d-9f92-a074e6a7bea2", "location": "HDH Seventh Market Seventh Market 2", "time": "3:23 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.98, "date": "2021-11-04T21:27:00.000Z", "id": "8a4d3254-7015-44be-a964-ee5d278cccb8", "location": "HDH Sixth Market NTP NTP Sixth Market Coffee 2", "time": "2:27 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.13, "date": "2021-11-04T21:03:00.000Z", "id": "a7931764-2e21-4c71-ae35-3fb8f020e517", "location": "HDH Seventh Market Seventh Market 3", "time": "2:03 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 10.47, "date": "2021-11-04T17:02:00.000Z", "id": "01e5f137-b5c2-49ee-946f-d068a89163de", "location": "HDH Seventh Market Seventh Market 3", "time": "10:02 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 2.55, "date": "2021-11-04T02:20:00.000Z", "id": "f352d1f8-c5da-42a5-8782-042184ec9a94", "location": "HDH Seventh Market Seventh Market 3", "time": "7:20 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.75, "date": "2021-11-03T21:51:00.000Z", "id": "f07bf5b2-ee69-4739-9c4f-92924a6a1671", "location": "HDH Seventh Market Seventh Market 2", "time": "2:51 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.99, "date": "2021-11-03T17:04:00.000Z", "id": "6c3d5829-fd97-453d-94e4-2b4f390c2a09", "location": "HDH Seventh Market Seventh Market 2", "time": "10:04 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.75, "date": "2021-11-03T02:34:00.000Z", "id": "86dd3367-3cea-463b-a178-c6ecb7103898", "location": "HDH Seventh Market Seventh Market 2", "time": "7:34 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 14.5, "date": "2021-11-02T18:04:00.000Z", "id": "d0e5e8bd-57f0-4348-9960-dde3b4598043", "location": "HDH The Bistro At The Strand Bistro Mobile Ordering", "time": "11:04 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.75, "date": "2021-11-01T17:08:00.000Z", "id": "fc62acbf-3503-4517-9d67-32b6fffb9779", "location": "HDH Seventh Market Seventh Market 2", "time": "10:08 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 14.24, "date": "2021-10-31T20:04:00.000Z", "id": "324138e7-5fe6-4c58-a582-bc94bc9ebcf9", "location": "HDH Seventh Market Seventh Market 3", "time": "1:04 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.75, "date": "2021-10-30T22:37:00.000Z", "id": "84d2f75d-ba2c-4384-bd9b-d3d10b4814d2", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "3:37 PM", "type": "Debit" }, { "account": "Triton2Go Dining Dollars", "amount": 5, "date": "2021-10-30T22:09:00.000Z", "id": "f904ca5f-7a42-4077-97ab-1d5e7883239b", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "3:09 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 1.5, "date": "2021-10-30T22:09:00.000Z", "id": "ba002b2d-a78a-42d1-8ba4-22cb75728859", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "3:09 PM", "type": "Debit" }, { "account": "Triton2Go Dining Dollars", "amount": 5, "date": "2021-10-30T13:01:00.000Z", "id": "2d4385fb-ef8b-4328-8ea8-4f1effdf828d", "location": "System HDH-DINERO", "time": "6:01 AM", "type": "Credit" }, { "account": "Dining Dollars", "amount": 8.44, "date": "2021-10-30T04:10:00.000Z", "id": "cac77675-4092-43f2-9fc3-410026343085", "location": "HDH Sixth Market NTP NTP Sixth Market Grocery 2", "time": "9:10 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 1.49, "date": "2021-10-30T02:20:00.000Z", "id": "e9020f69-b6da-4cf8-adf8-1de3596ed4c6", "location": "HDH Seventh Market Seventh Market 1", "time": "7:20 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 5.2, "date": "2021-10-29T00:10:00.000Z", "id": "0f011a55-7dd8-4e2e-8f57-214e539db55d", "location": "HDH Seventh Market Seventh Market 2", "time": "5:10 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 14.59, "date": "2021-10-28T16:23:00.000Z", "id": "a1e5d14a-9c48-4f4c-9358-d4e67ae705ee", "location": "HDH Seventh Market Seventh Market 3", "time": "9:23 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.65, "date": "2021-10-28T03:16:00.000Z", "id": "97904b69-7de8-4002-954d-784db857c6d0", "location": "HDH Seventh Market Seventh Market 2", "time": "8:16 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-28T02:18:00.000Z", "id": "d4e905ff-b176-4b5d-b7cf-99afca4b2436", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "7:18 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 10, "date": "2021-10-28T01:59:00.000Z", "id": "7080a359-f10b-4b16-a80c-29129036c748", "location": "HDH Oceanview Terrace OVT Spice Mobile Ordering", "time": "6:59 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 15.71, "date": "2021-10-27T17:09:00.000Z", "id": "2fb7536a-8d6a-4c0e-9b93-dcf3d221f3e1", "location": "HDH Sixth Market NTP NTP Sixth Market Grocery 2", "time": "10:09 AM", "type": "Debit" }, { "account": "Triton2Go Dining Dollars", "amount": 4.5, "date": "2021-10-27T14:43:00.000Z", "id": "d0ece80a-00b9-4554-95c1-5dde498de9fa", "location": "HDH Seventh Market Seventh Market 3", "time": "7:43 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 0.25, "date": "2021-10-27T14:43:00.000Z", "id": "68b12814-5f9d-43be-8566-2ab0f140a474", "location": "HDH Seventh Market Seventh Market 3", "time": "7:43 AM", "type": "Debit" }, { "account": "Triton2Go Dining Dollars", "amount": 5, "date": "2021-10-26T20:12:00.000Z", "id": "f7c8f65c-127e-4901-b12d-c13f446260a3", "location": "HDH The Bistro At The Strand Bistro1", "time": "1:12 PM", "type": "Debit" }, { "account": "Triton2Go Dining Dollars", "amount": 9.5, "date": "2021-10-26T19:09:00.000Z", "id": "be10a479-739b-4c10-8551-2350ee0ba68e", "location": "HDH The Bistro At The Strand Bistro Mobile Ordering", "time": "12:09 PM", "type": "Credit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-10-26T19:06:00.000Z", "id": "f4695f3b-5534-4437-afdf-a72e64168510", "location": "HDH The Bistro At The Strand Bistro Mobile Ordering", "time": "12:06 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-10-26T19:06:00.000Z", "id": "0c9328a1-7140-46f0-be14-a941d80f00d8", "location": "HDH The Bistro At The Strand Bistro Mobile Ordering", "time": "12:06 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.75, "date": "2021-10-26T17:40:00.000Z", "id": "4a93703a-b37e-4666-9def-aa9b07362539", "location": "HDH Seventh Market Seventh Market 2", "time": "10:40 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 20.23, "date": "2021-10-26T02:35:00.000Z", "id": "0d4e7536-830e-4749-a476-f14683c0ea83", "location": "HDH Seventh Market Seventh Market 3", "time": "7:35 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-10-25T19:59:00.000Z", "id": "218b6a1d-4cab-4c06-b7a1-57e7bfc2ecd8", "location": "Laundry Village Building 3 Left", "time": "12:59 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-10-25T18:35:00.000Z", "id": "96b6d4af-06d9-40bc-90b2-f8470f8aebdb", "location": "Laundry Village Building 3 Left", "time": "11:35 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-10-25T18:35:00.000Z", "id": "f86aa5ef-956d-46d2-8d4a-1e4df5c9c757", "location": "Laundry Village Building 3 Left", "time": "11:35 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7, "date": "2021-10-25T17:17:00.000Z", "id": "ca51a2b8-f6f3-48db-bc1c-18578f211b8d", "location": "HDH North Torrey Pines NTPR Wolftown 2", "time": "10:17 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.75, "date": "2021-10-25T14:46:00.000Z", "id": "6e2725cf-92e1-4ace-93f5-42ff8c24704a", "location": "HDH Seventh Market Seventh Market 3", "time": "7:46 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.75, "date": "2021-10-24T20:10:00.000Z", "id": "0aba5ea4-ab77-4c9f-96f0-3601529369eb", "location": "HDH Seventh Market Seventh Market 1", "time": "1:10 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 5.25, "date": "2021-10-23T18:28:00.000Z", "id": "752b2236-e649-41d1-92b2-0587be8ade1d", "location": "HDH Sixth Market NTP NTP Sixth Market Grocery 2", "time": "11:28 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 2, "date": "2021-10-23T18:02:00.000Z", "id": "12c8a07c-d65d-4fd7-a103-b2fb880643d1", "location": "HDH North Torrey Pines NTP Wolftown Mobile Ordering", "time": "11:02 AM", "type": "Debit" }, { "account": "Triton2Go Dining Dollars", "amount": 5, "date": "2021-10-23T17:48:00.000Z", "id": "d600ee45-b4c6-4b12-9436-da7fca4eb689", "location": "HDH North Torrey Pines NTPR Wolftown 2", "time": "10:48 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 3.5, "date": "2021-10-23T17:48:00.000Z", "id": "45523551-4c2f-4565-8b02-2332bd675230", "location": "HDH North Torrey Pines NTPR Wolftown 2", "time": "10:48 AM", "type": "Debit" }, { "account": "Triton2Go Dining Dollars", "amount": 5, "date": "2021-10-23T13:00:00.000Z", "id": "167a1979-105f-4014-85c2-899349a92b76", "location": "System HDH-DINERO", "time": "6:00 AM", "type": "Credit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-23T01:00:00.000Z", "id": "a49ddaf5-7c47-4d68-8af1-64703023c9d4", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "6:00 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-10-23T00:41:00.000Z", "id": "1b1f6e8c-c752-4020-b06d-28ef10ddc290", "location": "HDH Oceanview Terrace OVT Scholars Pizza Mobile", "time": "5:41 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 17.5, "date": "2021-10-22T20:37:00.000Z", "id": "9c906317-2b43-4922-ba2f-1a30fd82ed6e", "location": "HDH The Bistro At The Strand Bistro Mobile Ordering", "time": "1:37 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-22T02:05:00.000Z", "id": "4c4631a0-6328-4133-89e4-64ca82002876", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "7:05 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 9, "date": "2021-10-21T23:41:00.000Z", "id": "eef92cbc-1652-4a9c-9f5a-e6ffef38415c", "location": "Whole Foods Whole Foods 3", "time": "4:41 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-21T19:20:00.000Z", "id": "94a7e6bd-fa98-40eb-a1d2-06fff63e72c8", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "12:20 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-20T19:10:00.000Z", "id": "b4e1297a-ae9d-4ab6-aa1d-9377f9e4ad8c", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "12:10 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-20T17:34:00.000Z", "id": "b659f4f5-96e3-45d8-910d-980350d46ceb", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "10:34 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 14.32, "date": "2021-10-20T17:30:00.000Z", "id": "31029a0a-ac96-4456-a4b5-fdb1edaf4fa7", "location": "HDH Sixth Market NTP NTP Sixth Market Coffee 2", "time": "10:30 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 4.18, "date": "2021-10-19T00:52:00.000Z", "id": "96a3e3cb-4ceb-467e-920e-a0014b294226", "location": "HDH Rogers Market Rogers 1", "time": "5:52 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 8.12, "date": "2021-10-18T17:21:00.000Z", "id": "286ca2dc-a1a1-4880-b977-f90d7b622e27", "location": "HDH Rogers Market Rogers 1", "time": "10:21 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 8.42, "date": "2021-10-17T01:45:00.000Z", "id": "a00bd66a-a841-4bf4-9d6b-40b9f00dcb89", "location": "HDH Seventh Market Seventh Market 3", "time": "6:45 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 14.05, "date": "2021-10-16T17:00:00.000Z", "id": "5f5ae7eb-ec1f-4ff5-b286-e9f0ad4edff2", "location": "HDH Seventh Market Seventh Market 2", "time": "10:00 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-10-13T05:40:00.000Z", "id": "5ca5227d-9632-402f-ac68-52564bdbe501", "location": "Laundry Village Building 3 Left", "time": "10:40 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-10-13T04:45:00.000Z", "id": "03dec4da-144c-486d-845f-d72011774b49", "location": "Laundry Village Building 3 Left", "time": "9:45 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 8.5, "date": "2021-10-12T19:02:00.000Z", "id": "f478d354-cf3f-4cab-b7d2-a2176f71f133", "location": "HDH Oceanview Terrace OVT Scholars Pizza Mobile", "time": "12:02 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 1.5, "date": "2021-10-12T01:02:00.000Z", "id": "47daaea4-b1fc-4cce-8560-0014715def2d", "location": "HDH Cafe Ventanas Cafe V Worlds Fare Mobile Ord", "time": "6:02 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 12.17, "date": "2021-10-11T02:59:00.000Z", "id": "6de7dd19-9364-4a54-8ce6-0cc25211c06c", "location": "Whole Foods Whole Foods 3", "time": "7:59 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.75, "date": "2021-10-10T20:31:00.000Z", "id": "ef2e8f1d-f388-449c-8586-430c968c0ead", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "1:31 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 2.5, "date": "2021-10-10T19:57:00.000Z", "id": "fd3e26c4-769b-493b-a10a-708289536e97", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "12:57 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 5, "date": "2021-10-10T19:35:00.000Z", "id": "ce77e0dc-6d40-459a-a4f0-a0a71728c835", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "12:35 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-10T01:25:00.000Z", "id": "1799a62c-a647-4c8a-b01c-3c9de5deb5d2", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "6:25 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 10.24, "date": "2021-10-09T22:48:00.000Z", "id": "fad1d7e6-80c0-41a2-bed9-1e2034079bc0", "location": "Sweetfin UTC Sweetfin UTC", "time": "3:48 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-10-07T18:54:00.000Z", "id": "c3ffffe1-7587-4405-a636-bc817509d856", "location": "HDH North Torrey Pines NTP Rooftop Mobile Ordering", "time": "11:54 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 8.5, "date": "2021-10-06T16:47:00.000Z", "id": "3973e37b-2eea-4f67-9360-ecf0d13d10b2", "location": "HDH North Torrey Pines NTP Wolftown Mobile Ordering", "time": "9:47 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 8.64, "date": "2021-10-06T00:59:00.000Z", "id": "ac81edda-ad42-4d9f-b665-c86da738ef60", "location": "Tapioca Express Tapioca Express", "time": "5:59 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 50, "date": "2021-10-05T19:16:00.000Z", "id": "58171475-0ab8-4817-b92f-e611d141070b", "location": "Triton Card Accounts Services HDH-R-APP-AD", "time": "12:16 PM", "type": "Credit" }, { "account": "Dining Dollars", "amount": 2, "date": "2021-10-05T17:15:00.000Z", "id": "554d7a1c-65b0-4f34-80e9-5fb05feaa3af", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "10:15 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7.25, "date": "2021-10-05T16:55:00.000Z", "id": "a663f174-8900-4c59-9a34-7d1095b85b25", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "9:55 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7.25, "date": "2021-10-04T17:01:00.000Z", "id": "526cc37c-ac36-4091-962f-e3969b7a1321", "location": "HDH North Torrey Pines NTP Wolftown Mobile Ordering", "time": "10:01 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 4.38, "date": "2021-10-02T03:11:00.000Z", "id": "ecaf3cd2-c2c5-4fe0-a0ab-cc7473f62ad9", "location": "Tapioca Express Tapioca Express", "time": "8:11 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 4.38, "date": "2021-10-02T00:28:00.000Z", "id": "c0c34d6c-ee7a-4acc-8e06-e3d2f8a6fdf6", "location": "Tapioca Express Tapioca Express", "time": "5:28 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 6.93, "date": "2021-10-01T23:57:00.000Z", "id": "832c990d-2608-486f-9263-67a3ee3fd609", "location": "Tapioca Express Tapioca Express", "time": "4:57 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 15.68, "date": "2021-10-01T21:35:00.000Z", "id": "d3b45485-8a7e-48c9-a7c4-79f59ba28bc6", "location": "Lemongrass BBQ Lemongrass BBQ 1", "time": "2:35 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7, "date": "2021-09-30T16:34:00.000Z", "id": "14279811-d262-4b31-8093-b92fb400e65b", "location": "HDH North Torrey Pines NTPR Wolftown 1", "time": "9:34 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-09-30T08:30:00.000Z", "id": "32aadb9b-2994-4a10-a28f-c19be4d124b2", "location": "Laundry Village Building 3 Left", "time": "1:30 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-09-30T06:12:00.000Z", "id": "6e33792f-6051-4b89-9c88-8f5b2c4a709b", "location": "Laundry Village Building 3 Left", "time": "11:12 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 6.78, "date": "2021-09-29T17:53:00.000Z", "id": "d9e5d76b-9d7a-4d71-a87a-772621600441", "location": "Plant Power NTP Sixth Plant Power", "time": "10:53 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 100, "date": "2021-09-28T18:43:00.000Z", "id": "c5cf1b15-6778-4563-94ea-2bd16168d728", "location": "Triton Card Accounts Services HDH-R-APP-AD", "time": "11:43 AM", "type": "Credit" }, { "account": "Dining Dollars", "amount": 100, "date": "2021-09-28T18:07:00.000Z", "id": "a80b2946-0bb7-4247-927d-e02ab8a568f9", "location": "Triton Card Accounts Services HDH-R-APP-AD", "time": "11:07 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6, "date": "2021-09-28T16:17:00.000Z", "id": "97afc7e6-b1f9-48ba-8190-27e83e11e8a2", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "9:17 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.5, "date": "2021-09-28T00:29:00.000Z", "id": "c19381e0-1e9f-412a-9e3c-e79007048a74", "location": "HDH Oceanview Terrace OVT Counter Culture Mobile", "time": "5:29 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-09-27T23:53:00.000Z", "id": "31c7ab49-c7a4-499c-ae42-5048d5399edf", "location": "HDH Oceanview Terrace OVT Scholars Pizza Mobile", "time": "4:53 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 7, "date": "2021-09-25T00:57:00.000Z", "id": "f37cabfe-bfcb-48e7-8c2c-5d08229e8e20", "location": "HDH Cafe Ventanas Cafe V Worlds Fare Mobile Ord", "time": "5:57 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 6.75, "date": "2021-09-23T16:38:00.000Z", "id": "abfbec21-7e06-413a-8c48-edcd7ebb244d", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "9:38 AM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-09-22T02:21:00.000Z", "id": "a017a366-bf07-4437-9175-ba7f4efc6a04", "location": "Laundry Village Building 3 Left", "time": "7:21 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1, "date": "2021-09-22T02:20:00.000Z", "id": "69edabc8-a677-40cb-84ba-7c430581402d", "location": "Laundry Village Building 3 Left", "time": "7:20 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-09-22T01:33:00.000Z", "id": "9637a1b3-9bd3-4286-97cf-ebf323ba9563", "location": "Laundry Village Building 3 Left", "time": "6:33 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 1.25, "date": "2021-09-22T01:31:00.000Z", "id": "2077da1d-34d7-4f87-ba68-74fa9133c32a", "location": "Laundry Village Building 3 Left", "time": "6:31 PM", "type": "Debit" }, { "account": "Triton Cash", "amount": 20, "date": "2021-09-22T01:06:00.000Z", "id": "e668382a-a229-4f6c-a2b1-dffeb8a3b320", "location": "externalclient externalclient", "time": "6:06 PM", "type": "Credit" }, { "account": "Dining Dollars", "amount": 11.25, "date": "2021-09-20T19:18:00.000Z", "id": "ac9d2d5f-3e37-4ee7-b717-b24d4b70ded6", "location": "HDH 64 Degrees 64-Wok Mobile Ordering", "time": "12:18 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 10.25, "date": "2021-09-20T00:12:00.000Z", "id": "57daee43-c0f5-4201-8538-cd5daaef1103", "location": "HDH 64 Degrees 64-Taqueria Mobile Ordering", "time": "5:12 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 5, "date": "2021-09-19T18:29:00.000Z", "id": "a6d9c185-2455-47f8-9670-4213a76fad0b", "location": "HDH Cafe Ventanas Cafe Ventanas Mobile Ordering", "time": "11:29 AM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-09-19T00:42:00.000Z", "id": "664c47d7-958a-4e02-b42e-011aeff62719", "location": "HDH North Torrey Pines NTP Wolftown Mobile Ordering", "time": "5:42 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 9.5, "date": "2021-09-18T01:19:00.000Z", "id": "2544ae02-3f5f-4e6f-a75e-f2816a247a17", "location": "HDH Oceanview Terrace OVT Scholars Pizza Mobile", "time": "6:19 PM", "type": "Debit" }, { "account": "Dining Dollars", "amount": 3749, "date": "2021-09-10T17:47:00.000Z", "id": "e67ef4a6-3c5d-4f05-90da-f45f9a00a365", "location": "Triton Card Accounts Services HDH-R-APP-AD", "time": "10:47 AM", "type": "Credit" }];
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
          locations: locations.sort(function (a, b) { return a.localeCompare(b) })
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
    var data = this.state.filtered_data;
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
        <div className="totals_table">
          <table>
            <thead>
              <tr>
                <th>Total</th>
                <th>Dining Dollars</th>
                <th>Triton Cash</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>${data.filter(e => e["type"].toLowerCase() === "credit" && e["account"].toLowerCase() === "dining dollars").reduce((a, b) => a + b["amount"], 0) - data.filter(e => e["type"].toLowerCase() === "debit" && e["account"].toLowerCase() === "dining dollars").reduce((a, b) => +(a + b["amount"]).toFixed(2), 0)}</td>
                <td>${data.filter(e => e["type"].toLowerCase() === "credit" && e["account"].toLowerCase() === "triton cash").reduce((a, b) => a + b["amount"], 0) - data.filter(e => e["type"].toLowerCase() === "debit" && e["account"].toLowerCase() === "triton cash").reduce((a, b) => +(a + b["amount"]).toFixed(2), 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="footer">
          <p>Budget Buddy ({this.state.version}) by Raymond Wang</p>
          <p>{this.state.filtered_data.length} {this.state.filtered_data.length !== 1 ? "Transactions" : "Transaction"}</p>
        </div>
      </div>
    )
  }
}
