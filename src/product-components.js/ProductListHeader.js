const ProductListHeader = (props) => {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title={props.title}
        extra={<NavLink key="3">Add Product</NavLink>}
      ></PageHeader>
    </div>
  );
};
export default ProductListHeader;
