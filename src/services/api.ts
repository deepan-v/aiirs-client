let API_URL = process.env.API_URL + "/api";

export let auth_api = {
  login_auth: `${API_URL}/login_auth`,
};

export let content_upload = {
  banner_title: `${API_URL}/banner`,
  get_banner: (id: string) => `${API_URL}/get_banner/${id}`,
  get_all_request: `${API_URL}/get_all_request`,
  program_content_get: (id: string) => `${API_URL}/program_content_get/${id}`,
  get_program: (id: string) => `${API_URL}/get_program/${id}`,
  banner_delete: (id: string) => `${API_URL}/banner_delete/${id}`,
  mentor_delete: (id: string) => `${API_URL}/mentor_delete/${id}`,
  program_content_delete: (id: string) =>
    `${API_URL}/program_content_delete/${id}`,
  reviews_delete: (id: string) => `${API_URL}/Review_delete/${id}`,
  learn_delete: (id: string) => `${API_URL}/learn_delete/${id}`,
  multi_course_delete: (id: string) => `${API_URL}/multi_course_delete/${id}`,
  banner_update: (id: string) => `${API_URL}/banner_update/${id}`,
  get_all_cards: `${API_URL}/get_all_cards`,
  get_course_by_id: (id: string) => {
    return `${API_URL}/get_by_course_id/?course=${id}`;
  },
  card_creation: `${API_URL}/card_post`,
  program_overview: `${API_URL}/program_over_view`,
  card_delete: (id: string) => {
    return `${API_URL}/card_delete/${id}`;
  },
  program_delete: (id: string) => {
    return `${API_URL}/program_delete/${id}`;
  },
  card_update: (id: string, publicId: string) => {
    return `${API_URL}/update_course_card/${id}?publicId=${publicId}`;
  },
  mentor_post: `${API_URL}/mentor_post`,
  learn_card: `${API_URL}/learn_card`,
  review_image_post: `${API_URL}/review_image_post`,
  program_content: `${API_URL}/program_content`,
  multi_course_update: `${API_URL}/multi_course_update`,
  get_mentors: (id: string) => `${API_URL}/get_mentors/${id}`,
  multi_course_get: (id: string) => `${API_URL}/multi_course_get/${id}`,
  learn_content_get: (id: string) => `${API_URL}/learn_content_get/${id}`,
  reviews_get: (id: string) => `${API_URL}/reviews_get/${id}`,
};
