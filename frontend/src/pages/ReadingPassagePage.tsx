import React from 'react';
import ReadingPassageArea from '../components/ReadingPassageArea';
import { PassageConfig } from '../types/reading';

interface ReadingPassagePageProps {
    passageConfig: PassageConfig;
}

const ReadingPassagePage: React.FC<ReadingPassagePageProps> = ({ passageConfig }) => {
    return (
        <div>
            <ReadingPassageArea passageTitle={passageConfig.title} passageText={passageConfig.text} />
        </div>
    );
};

export default ReadingPassagePage;
