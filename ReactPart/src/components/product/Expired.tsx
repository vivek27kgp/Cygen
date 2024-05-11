import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import Viewpageexpired from './Viewpageexpired';
import DefaultLayout from '../../layout/DefaultLayout';

const Expired: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Expired Product List" />

      
        <Viewpageexpired/>
      
      
    </DefaultLayout>
  );
};

export default Expired;
