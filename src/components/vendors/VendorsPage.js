import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import * as vendorActions from "../../redux/actions/vendorActions";
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import VendorsList from './VendorsList';
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';

function VendorsPage (props) {
 
  const [vendorCounts, setVendorCounts] = useState([]);
  const [dataSlice, setDataSlice] = useState(30);
  const [textBoxFilter, setTextBoxFilter] = useState('');
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLiveChecked, setIsLiveChecked] = useState(false);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  useEffect(()=>{
    if(props.vendors.length == 0)
    {
      props.actions.loadVendors().catch(error => {
          alert('loadingg vendors failed'+ error)
      })
    }
    else{
      var filteredCounts = props.vendors.length > 0 ? filterVendors() : [];
      setVendorCounts(filteredCounts);      
      setFilteredGames(props.vendors);
    }
  },[props.vendors])

  const onTextInputChanged = (event) => {
    const { value } = event.target;

    const dataset = filteredGames.length == 0 ? props.vendors : filteredGames;
    const values = dataset.filter((v) =>  v.title.toLowerCase().includes(value.toLowerCase()));
    let filteredValues = value == '' ? props.vendors : values;
    filteredValues = isLiveChecked == true ? filteredValues.filter((v) => v.isLive == isLiveChecked) : filteredValues;

    setTextBoxFilter(value);
    setFilteredGames(filteredValues);
  }
  
  const onCheckBoxChanged = (event) => {
    const {checked} = event.target;

    let values = filteredGames.filter((v) => v.isLive == checked);
    values = values.length == 0 && checked == false ? props.vendors.filter((v) =>  v.title.toLowerCase().includes(textBoxFilter.toLowerCase())) : values;

    setFilteredGames(values);
    setIsLiveChecked(!isLiveChecked);
  }

  const onLoadMoreClick = () => {
    setDataSlice(loadMoreClicked === true? dataSlice / 2 : dataSlice * 2 )
    setLoadMoreClicked(!loadMoreClicked);
  }

  const filterVendors = () => {
    const {vendors} = props;
    const counts = vendors.reduce((vendor, c) => {
        var name = c.vendor;
        if (!vendor.hasOwnProperty(name)) {
            vendor[name] = 0;
        }
        vendor[name]++;
        return vendor;
      }, {});

      return counts;
  }

  return (
    <>
      <div className="container-fluid">
          <div className="form-group">
            <h2>
                Vendors Game Counts
            </h2>
            <ul className="list-group">
            {              
                vendorCounts.length !== 0 ?   
                  Object.entries(vendorCounts).map(function(key,index) {
                      return (<li key={key} className="list-group-item">{key[0]} - {key[1]}</li>)
                      })
                : null
            }
            </ul>
          </div>
          <div>
              <h2>Games</h2>
              <TextInput 
                  name="Vendors Filter"
                  label="Filter Values"
                  onChange={onTextInputChanged} 
              />
              <CheckBox 
                  label="Display Live Only?"
                  onChange={onCheckBoxChanged}
              />
              <VendorsList 
                  vendors={filteredGames.length == 0 ? [] : filteredGames} 
                  onClick={onLoadMoreClick}
                  displayCount={dataSlice}
                  loadMoreLabel={loadMoreClicked ? "Load Less" : "Load More"}/>
          </div>
      </div>
    </>
  );
}

VendorsPage.propTypes = {
  vendors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
    vendors: state.vendors
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(vendorActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(VendorsPage);
