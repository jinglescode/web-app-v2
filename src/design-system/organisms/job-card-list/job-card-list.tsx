import css from './job-card-list.module.scss';
import { JobCard } from '../../molecules/job-card/job-card';
import { JobCardListProps } from './job-card-list.types';

export const JobCardList = (props: JobCardListProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.list}>
        {props.list.map((job) => {
          return (
            <div key={job.id} onClick={() => props.onItemClick(job?.id)}>
              <JobCard {...job} />
            </div>
          );
        })}
      </div>
      {props.showMore && (
        <div onClick={props.onSeeMoreClick} className={css.seeMore}>
          See more
        </div>
      )}
    </div>
  );
};