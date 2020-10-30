import React from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import Loading from '../common/Loading';

const List = ({ values }) => {

  return (values.map((value, i) => {        
        return (
            <tr key={value.id} >
                <th scope="row"><LazyLoad key={value.id} placeholder={<Loading />}><img className="img-thumbnail" src={`https://picsum.photos/id/${i}/200/200`}></img> </LazyLoad></th>
                <td>{value.title}</td>
                <td>{(value.isLive) ? "True" : "False"}</td>            
            </tr>
        );
    })
  )};

List.propTypes = {
  values: PropTypes.array
};

export default List;
