import React from 'react';
import ResumeSidebarRoutes from './resume-sidebar-routes';

const ResumeSidebar = () => {
  return (
    <div className="w-80 h-full bg-background/95 flex-col  justify-between p-4 lg:flex hidden">
      <ResumeSidebarRoutes/>
    </div>
  );
}

export default ResumeSidebar;
