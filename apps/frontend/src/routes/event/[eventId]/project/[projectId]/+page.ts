import type { ProjectDto } from '@hack-it/dtos';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
  const fetchProject = async (projectId: string) => {
    const response = await fetch(`/api/projects/${projectId}`);
    const json: ProjectDto = await response.json();
    return json;
  };

  return {
    project: fetchProject(params.projectId),
  };
}) satisfies PageLoad;
