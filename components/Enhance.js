import { Component, Fragment } from "react";
import VisibilitySensor from 'react-visibility-sensor';
import TrackVisibility from 'react-on-screen';


export const Enhance = ComposedComponent => class extends Component {
    state = {
        visible: false
    }
    onChangeVisibility (isVisible) {
        this.setState({visible: isVisible});
    }  
    render() {
        return (
            <TrackVisibility once>
                {({ isVisible }) => isVisible && <ComposedComponent {...this.props}/>}
            </TrackVisibility>
        )}
};