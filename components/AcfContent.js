import React, {Component, Fragment} from 'react';
import dynamic from 'next/dynamic';
// import { TransitionGroup, CSSTransition, Transition } from "react-transition-group";


const Banner = dynamic(() => import('./Banner'), { loading: () => <p></p> });
const UserType = dynamic(() => import('./UserType'), { loading: () => <p></p> });
const BottomCTA = dynamic(() => import('./BottomCTA/index'), { loading: () => <p></p> });
const DriveSales = dynamic(() => import('./DriveSales/index'), { loading: () => <p></p> });
const RetailEcommerce = dynamic(() => import('./RetailEcommerce/index'), { loading: () => <p></p> });
const SeamlessEcommerce = dynamic(() => import('./SeamlessEcommerce/index'), { loading: () => <p></p> });
const Feature = dynamic(() => import('./Feature/index'), { loading: () => <p></p> });
const OverView = dynamic(() => import('./SupplierProfilesReach/index'), { loading: () => <p></p> });
const Team = dynamic(() => import('./Team/index'), { loading: () => <p></p> });
const FeatureWithLeftImage = dynamic(() => import('./WholesalerBusinessIntelligence/index'), { loading: () => <p></p> });
const Press = dynamic(() => import('./Press/index'), { loading: () => <p></p> });
const Contact = dynamic(() => import('./Contact/index'), { loading: () => <p></p> });
const Transition = dynamic(() => import('./Transition/index'), { loading: () => <p></p> });



class ACFCONTENT extends Component {
    render() {
        const { acf, gmap_api } = this.props;
        let Section = null;
        if(acf.sections) {
            Section = acf.sections.map(section => {
                return (
                    <Fragment key={section.acf_fc_layout}>
                        {section.acf_fc_layout === 'banner' ? <Banner {...section}/> : ''}
                        {section.acf_fc_layout === 'user_type' ? <UserType {...section}/> : ''}
                        {section.acf_fc_layout === 'title_and_two_image_columns' ? <SeamlessEcommerce {...section}/> : ''}
                        {section.acf_fc_layout === 'title_and_image_with_text_columns' ? <RetailEcommerce {...section}/> : ''}
                        {section.acf_fc_layout === 'features' ? <Feature {...section}/> : ''}
                        {section.acf_fc_layout === 'overview_with_image' ? <OverView {...section}/> : ''}
                        {section.acf_fc_layout === 'feature_box_with_column' ? <DriveSales {...section}/> : ''}
                        {section.acf_fc_layout === 'bottom_cta' ? <BottomCTA {...section}/> : ''}
                        {section.acf_fc_layout === 'team' ? <Team {...section}/> : ''}
                        {section.acf_fc_layout === 'feature_list_with_image_on_the_left' ? <FeatureWithLeftImage {...section}/> : ''}
                        {section.acf_fc_layout === 'press' ? <Press {...section}/> : ''}
                        {section.acf_fc_layout === 'contact' ? <Contact {...section} api={gmap_api}/> : ''}
                    </Fragment>
                );
            });
        }
       
        return (
            <div className='bridge-content'>
                {Section}
                
                <style jsx>{`
                    div {
                        padding-top: 170px;
                    }
                    div .bridge-contact{
                        padding-top: 0;
                    }
                    @media only screen and (max-width: 991px) {
                        div {
                            padding-top: 100px;
                        }
                    }
                `}</style>

               
            </div>
        )
    }
}

export default ACFCONTENT;