import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import { JobListingCard } from 'src/modules/Jobs/components/JobListingCard';

import css from './organization-jobs.module.scss';
import { useOrganizationJobs } from './useOrganizationJobs';

export const OrganizationJobs = () => {
  const {
    data: { PER_PAGE, jobs, page, total },
    operations: { setPage },
  } = useOrganizationJobs();

  return (
    <div className={css.organizationJobs}>
      <div className={css.jobListing}>
        {jobs.map(job => (
          <div key={job.id} className={css.jobItem}>
            <JobListingCard job={job} hasDescription={false} />
          </div>
        ))}
      </div>
      <div className="mt-11 hidden md:block">
        <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />
      </div>
      <div className="mt-11 block md:hidden">
        <PaginationMobile page={page} count={Math.ceil(total / PER_PAGE)} handleChange={setPage} />
      </div>
    </div>
  );
};
