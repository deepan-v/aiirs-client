import React from "react";
import BannerMain from "./Banner/BannerMain";
import ProgramMain from "./ProgramOverview/ProgramMain";
import MentorMain from "./Mentor/MentorMain";
import MultipleMain from "./MultipleCourse/CourseMain";
import LearnCardMain from "./WhatWillYouLearn/LearnMain";
import MultipleImageForm from "./Reviews/ReviewPost";
import ReviewMain from "./Reviews/ReviewMain";
import ProgramMainContent from "./ProgramContent/ProgramMain";

const MainWrapper = () => {
  return (
    <div className="bg-white  border-2 p-4">
      <div className="grid grid-cols-2 gap-14">
        <BannerMain />
        <ProgramMain />
      </div>
      <div className="mt-16">
        <MentorMain />
      </div>
      <div className="mt-16">
        <MultipleMain />
      </div>
      <div>
        <LearnCardMain />
      </div>
      <div>
        <ReviewMain />
      </div>
      <div>
        <ProgramMainContent />
      </div>
    </div>
  );
};

export default MainWrapper;
