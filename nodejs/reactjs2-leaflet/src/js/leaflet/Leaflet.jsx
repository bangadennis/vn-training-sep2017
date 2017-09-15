import React, { Component } from 'react';
import L from 'leaflet';

require( 'leaflet/dist/leaflet.css' );
require( './Leaflet.css' );

class Leaflet extends Component {
  componentDidMount() {
    const map = L.map( this.refs.container ).setView( [50.5, 30.5], 13 );
    L.tileLayer( 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' ).addTo( map );

    L.marker([50.5, 30.5]).addTo(map);

  }

  render() {
    return <div className="Leaflet-container" ref="container"></div>;
  }
}

export default Leaflet;
