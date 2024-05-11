import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ChartOne from '../Charts/ChartOne';

import Viewpage from './Viewpage';
import DefaultLayout from '../../layout/DefaultLayout';

const View: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Subcategory List" />

      
        <Viewpage/>
      
      
    </DefaultLayout>
  );
};

export default View;
