import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Viewpage from './Viewpage';
import DefaultLayout from '../../layout/DefaultLayout';

const View: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category List" />

      
        <Viewpage/>
      
      
    </DefaultLayout>
  );
};

export default View;
