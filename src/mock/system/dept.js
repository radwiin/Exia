import Mock from "mockjs";

// const data = [
//   {
//     id: 1,
//     tenantId: "000000",
//     parentId: "0",
//     fullName: "江苏刀锋科技有限公司",
//     deptName: "刀锋科技",
//     ancestors: "0",
//     deptCategory: 1,
//     sort: 1,
//     remark: "",
//     isDeleted: 0,
//     parentName: "",
//     deptCategoryName: "公司"
//   },
//   {
//     id: 2,
//     tenantId: "000000",
//     parentId: "0",
//     fullName: "江苏刀锋科技有限公司",
//     deptName: "刀锋科技",
//     ancestors: "0",
//     deptCategory: 1,
//     sort: 1,
//     remark: "",
//     isDeleted: 0,
//     parentName: "",
//     deptCategoryName: "公司"
//   },
//   {
//     id: 3,
//     tenantId: "000000",
//     parentId: "0",
//     fullName: "江苏刀锋科技有限公司",
//     deptName: "刀锋科技",
//     ancestors: "0",
//     deptCategory: 1,
//     sort: 1,
//     remark: "",
//     isDeleted: 0,
//     parentName: "",
//     deptCategoryName: "公司",
//     children: [
//       {
//         id: 31,
//         tenantId: "000000",
//         parentId: "0",
//         fullName: "江苏刀锋科技有限公司",
//         deptName: "刀锋科技",
//         ancestors: "0",
//         deptCategory: 1,
//         sort: 1,
//         remark: "",
//         isDeleted: 0,
//         parentName: "",
//         deptCategoryName: "公司"
//       },
//       {
//         id: 32,
//         tenantId: "000000",
//         parentId: "0",
//         fullName: "江苏刀锋科技有限公司",
//         deptName: "刀锋科技",
//         ancestors: "0",
//         deptCategory: 1,
//         sort: 1,
//         remark: "",
//         isDeleted: 0,
//         parentName: "",
//         deptCategoryName: "公司"
//       }
//     ]
//   },
//   {
//     id: 4,
//     tenantId: "000000",
//     parentId: "0",
//     fullName: "江苏刀锋科技有限公司",
//     deptName: "刀锋科技",
//     ancestors: "0",
//     deptCategory: 1,
//     sort: 1,
//     remark: "",
//     isDeleted: 0,
//     parentName: "",
//     deptCategoryName: "公司"
//   }
// ];
const data = [
  {
    id: "1123598813738675201",
    tenantId: "000000",
    parentId: "0",
    fullName: "江苏刀锋科技有限公司",
    deptName: "刀锋科技",
    ancestors: "0",
    deptCategory: 1,
    sort: 1,
    remark: "",
    isDeleted: 0,
    children: [
      {
        id: "1123598813738675202",
        tenantId: "000000",
        parentId: "1123598813738675201",
        fullName: "常州刀锋科技有限公司",
        deptName: "常州刀锋",
        ancestors: "0,1123598813738675201",
        deptCategory: 1,
        sort: 1,
        remark: "",
        isDeleted: 0,
        children: [
          {
            id: "1152441274775060481",
            tenantId: "000000",
            parentId: "1123598813738675202",
            fullName: "研发部",
            deptName: "研发部",
            ancestors: "0,1123598813738675201,1123598813738675202",
            deptCategory: 2,
            sort: 1,
            remark: "",
            isDeleted: 0,
            children: [
              {
                id: "1152441505113653250",
                tenantId: "000000",
                parentId: "1152441274775060481",
                fullName: "电商事务组",
                deptName: "电商事务组",
                ancestors:
                  "0,1123598813738675201,1123598813738675202,1152441274775060481",
                deptCategory: 3,
                sort: 1,
                remark: "",
                isDeleted: 0,
                parentName: "",
                deptCategoryName: "小组"
              },
              {
                id: "1152441586571231234",
                tenantId: "000000",
                parentId: "1152441274775060481",
                fullName: "直播事务组",
                deptName: "直播事务组",
                ancestors:
                  "0,1123598813738675201,1123598813738675202,1152441274775060481",
                deptCategory: 3,
                sort: 2,
                remark: "",
                isDeleted: 0,
                parentName: "",
                deptCategoryName: "小组"
              }
            ],
            parentName: "",
            deptCategoryName: "部门"
          },
          {
            id: "1152441346162114562",
            tenantId: "000000",
            parentId: "1123598813738675202",
            fullName: "产品部",
            deptName: "产品部",
            ancestors: "0,1123598813738675201,1123598813738675202",
            deptCategory: 2,
            sort: 2,
            remark: "",
            isDeleted: 0,
            parentName: "",
            deptCategoryName: "部门"
          }
        ],
        parentName: "",
        deptCategoryName: "公司"
      },
      {
        id: "1123598813738675203",
        tenantId: "000000",
        parentId: "1123598813738675201",
        fullName: "苏州刀锋科技有限公司",
        deptName: "苏州刀锋",
        ancestors: "0,1123598813738675201",
        deptCategory: 1,
        sort: 1,
        remark: "",
        isDeleted: 0,
        parentName: "",
        deptCategoryName: "公司"
      }
    ],
    parentName: "",
    deptCategoryName: "公司"
  },
  {
    id: "1226473230418612225",
    tenantId: "763196",
    parentId: "0",
    fullName: "用户组",
    deptName: "用户组",
    ancestors: "0",
    deptCategory: 1,
    sort: 2,
    remark: "",
    isDeleted: 0,
    parentName: "",
    deptCategoryName: "公司"
  },
  {
    id: "1226473264983871492",
    tenantId: "648897",
    parentId: "0",
    fullName: "测试组",
    deptName: "测试组",
    ancestors: "0",
    deptCategory: 1,
    sort: 2,
    remark: "",
    isDeleted: 0,
    parentName: "",
    deptCategoryName: "公司"
  }
];

Mock.mock("/dept/query", "post", options => {
  console.info("options", options);
  return {
    code: 200,
    success: true,
    msg: "操作成功",
    data
  };
});
