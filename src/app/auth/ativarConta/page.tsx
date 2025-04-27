import ActiveAccountByLink from 'NextCMS/layouts/ActiveAccountByLink';

const ActiveAccountByLinkPage: Page<'ActiveAccountByLink'> = ({ params }) => (
	<ActiveAccountByLink token={params.token} />
);

export default ActiveAccountByLinkPage;
