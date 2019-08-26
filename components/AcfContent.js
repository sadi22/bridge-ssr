import React, {Component, Fragment} from 'react';
import dynamic from 'next/dynamic'


const Banner = dynamic(() => import('./Banner'));
const BottomCTA = dynamic(() => import('./BottomCTA/index'));
const DriveSales = dynamic(() => import('./DriveSales/index'));
const RetailEcommerce = dynamic(() => import('./RetailEcommerce/index'));
const SeamlessEcommerce = dynamic(() => import('./SeamlessEcommerce/index'));
const Feature = dynamic(() => import('./Feature/index'));
const OverView = dynamic(() => import('./SupplierProfilesReach/index'));

class ACFCONTENT extends Component {
    render() {
        const { acf } = this.props;
        let Section = null;
        if(acf.sections) {
            Section = acf.sections.map(section => {
                return (
                    <Fragment key={section.acf_fc_layout}>
                        {section.acf_fc_layout === 'banner' ? <Banner {...section}/> : ''}
                        {section.acf_fc_layout === 'title_and_two_image_columns' ? <SeamlessEcommerce {...section}/> : ''}
                        {section.acf_fc_layout === 'title_and_image_with_text_columns' ? <RetailEcommerce {...section}/> : ''}
                        {section.acf_fc_layout === 'features' ? <Feature {...section}/> : ''}
                        {section.acf_fc_layout === 'overview_with_image' ? <OverView {...section}/> : ''}
                        {section.acf_fc_layout === 'feature_box_with_column' ? <DriveSales {...section}/> : ''}
                        {section.acf_fc_layout === 'bottom_cta' ? <BottomCTA {...section}/> : ''}
                    </Fragment>
                );
            });
        }
       
        return (
            <Fragment>
                {Section}
            </Fragment>
        )
    }
}

export default ACFCONTENT;