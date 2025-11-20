import React from 'react';
import UpcomingEventsCarousel from './_components/UpcomingEventsCarousel';
import FeaturedMatchBanner from './_components/FeaturedMatchBanner';

const Page = () => {
    return (
        <div>
            <FeaturedMatchBanner />
            <UpcomingEventsCarousel />
        </div>
    );
}

export default Page;
