import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import contractABI from './contractABI'
import Web3Utils from 'web3-utils'

class App extends Component {
  async componentDidMount() {
    const contractAddress = '0x2Ff05aA9c6aC2CC927448d1f7625045C66282A6B';
    let web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/PROJECTID'));
    let myContract = new web3.eth.Contract(contractABI, contractAddress);
    let tokenName = await myContract.methods.name().call();
    let symbol = await myContract.methods.symbol().call();
    let decimals = await myContract.methods.decimals().call();
    let transactions = await myContract.getPastEvents('Transfer', {
      fromBlock: 0,
      toBlock: 'latest'
    });
    this.setState({
      token: tokenName,
      symbol: symbol,
      decimal: decimals,
      trans: transactions
    });
    console.log(transactions)
  }

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      symbol: '',
      decimal: '',
      trans: []
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://www.github.com/brokecollegekidwithaclothingobsession"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fetti Token
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto" style={{ width:'780px' }}>
                <h1>Token Information</h1>
                <div className="row">
                  <div className="col-4">
                    <div className="bg-dark pt-4 pb-3 m-1">
                      <h3 className="text-white">Contract Name</h3>
                      <h4 className="text-white">{this.state.token}</h4>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-dark pt-4 pb-3 m-1">
                      <h3 className="text-white">Contract Symbol</h3>
                      <h4 className="text-white">{this.state.symbol}</h4>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bg-dark pt-4 pb-3 m-1">
                      <h3 className="text-white">Decimals</h3>
                      <h4 className="text-white">{this.state.decimal}</h4>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h2>Transactions</h2>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Transaction Hash</th>
                          <td>Method</td>
                          <td>From</td>
                          <td>To</td>
                          <td>Amount</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.trans.map((Transactions, key) => {
                          return (
                            <tr key={key}>
                              <td>{Transactions.transactionHash.substring(0, 20)}...</td>
                              <td>{Transactions.event}</td>
                              <td>{Transactions.returnValues[0].substring(0, 20)}...</td>
                              <td>{Transactions.returnValues[1].substring(0, 20)}...</td>
                              <td>{Web3Utils.fromWei(Transactions.returnValues._value._hex).toString()}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                      <span role="img" aria-label="Made with love" class="text-muted">Made with ❤️ | © 2021</span>
                    </div>
                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                      <li class="ms-4">
                        <a href="https://www.twitter.com/6missedcalls"><i class="bi-twitter" role="img" aria-label="Twitter" style={{ fontSize:'1.5rem', padding:'10px' }}></i></a>
                      </li>
                      <li class="ms-4">
                        <a href="https://discord.gg/Ec8xPXuY5J"><i class="bi-discord" role="img" aria-label="Discord" style={{ fontSize:'1.5rem', padding:'10px'  }} /></a>
                      </li>
                      <li class="ms-4">
                        <a href="https://www.github.com/brokecollegekidwithaclothingobsession"><i class="bi-github" role="img" aria-label="GitHub" style={{ fontSize:'1.5rem', padding:'10px'  }}></i></a>
                      </li>
                    </ul>
                    </footer>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
