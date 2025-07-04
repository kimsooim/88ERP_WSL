"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Check,
  Users,
  Building2,
  Shield,
  Zap,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

interface Department {
  id: string;
  name: string;
  type: "department" | "team";
  managerId?: string;
  managerName?: string;
  managerRole?: string;
  parentId?: string;
}

interface TeamMember {
  id: string;
  name: string;
  englishName: string;
  role: string;
  department: string;
  team?: string;
  type: "manager" | "sales" | "rd" | "maker";
}

interface PagePermission {
  path: string;
  name: string;
  category: string;
  allowedRoles: string[];
  children?: PagePermission[];
}

const defaultPages: PagePermission[] = [
  {
    path: "/online",
    name: "온라인사업",
    category: "online",
    allowedRoles: [],
    children: [
      {
        path: "/online",
        name: "대시보드",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/products",
        name: "제품관리",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/orders",
        name: "주문관리",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/channels",
        name: "채널관리",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/customers",
        name: "고객관리",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/purchases",
        name: "구매관리",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/advertising",
        name: "광고관리",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/sales",
        name: "매출관리",
        category: "online",
        allowedRoles: [],
      },
      {
        path: "/online/automation",
        name: "자동화",
        category: "online",
        allowedRoles: [],
      },
    ],
  },
  {
    path: "/offline",
    name: "오프라인사업",
    category: "offline",
    allowedRoles: [],
    children: [
      {
        path: "/offline",
        name: "대시보드",
        category: "offline",
        allowedRoles: [],
      },
      {
        path: "/offline/products",
        name: "제품관리",
        category: "offline",
        allowedRoles: [],
      },
      {
        path: "/offline/orders",
        name: "주문관리",
        category: "offline",
        allowedRoles: [],
      },
      {
        path: "/offline/channels",
        name: "채널관리",
        category: "offline",
        allowedRoles: [],
      },
      {
        path: "/offline/customers",
        name: "고객관리",
        category: "offline",
        allowedRoles: [],
      },
      {
        path: "/offline/purchases",
        name: "구매관리",
        category: "offline",
        allowedRoles: [],
      },
      {
        path: "/offline/sales",
        name: "매출관리",
        category: "offline",
        allowedRoles: [],
      },
      {
        path: "/offline/automation",
        name: "자동화",
        category: "offline",
        allowedRoles: [],
      },
    ],
  },
  {
    path: "/toy",
    name: "토이사업",
    category: "toy",
    allowedRoles: [],
    children: [
      { path: "/toy", name: "대시보드", category: "toy", allowedRoles: [] },
      {
        path: "/toy/products",
        name: "제품관리",
        category: "toy",
        allowedRoles: [],
      },
      {
        path: "/toy/customers",
        name: "고객관리",
        category: "toy",
        allowedRoles: [],
      },
      {
        path: "/toy/quotes",
        name: "견적관리",
        category: "toy",
        allowedRoles: [],
      },
      {
        path: "/toy/samples",
        name: "샘플관리",
        category: "toy",
        allowedRoles: [],
      },
      {
        path: "/toy/production",
        name: "생산관리",
        category: "toy",
        allowedRoles: [],
      },
      {
        path: "/toy/advertising",
        name: "광고관리",
        category: "toy",
        allowedRoles: [],
      },
      {
        path: "/toy/sales",
        name: "매출관리",
        category: "toy",
        allowedRoles: [],
      },
      {
        path: "/toy/automation",
        name: "자동화",
        category: "toy",
        allowedRoles: [],
      },
    ],
  },
  {
    path: "/purchase-report",
    name: "구매보고서",
    category: "purchase-report",
    allowedRoles: [],
    children: [
      {
        path: "/purchase-report/total-inventory",
        name: "전체재고",
        category: "purchase-report",
        allowedRoles: [],
      },
      {
        path: "/purchase-report/period-inventory",
        name: "기간별재고",
        category: "purchase-report",
        allowedRoles: [],
      },
      {
        path: "/purchase-report/business-inventory",
        name: "사업부별재고",
        category: "purchase-report",
        allowedRoles: [],
      },
      {
        path: "/purchase-report/item-inventory",
        name: "품목별재고",
        category: "purchase-report",
        allowedRoles: [],
      },
      {
        path: "/purchase-report/import-status",
        name: "수입현황",
        category: "purchase-report",
        allowedRoles: [],
      },
    ],
  },
  {
    path: "/sales-report",
    name: "매출보고서",
    category: "sales-report",
    allowedRoles: [],
    children: [
      {
        path: "/sales-report/period-analysis",
        name: "기간별분석",
        category: "sales-report",
        allowedRoles: [],
      },
      {
        path: "/sales-report/business-analysis",
        name: "사업별분석",
        category: "sales-report",
        allowedRoles: [],
      },
      {
        path: "/sales-report/manager-analysis",
        name: "담당자별분석",
        category: "sales-report",
        allowedRoles: [],
      },
      {
        path: "/sales-report/automation",
        name: "자동화",
        category: "sales-report",
        allowedRoles: [],
      },
    ],
  },
  {
    path: "/profit-report",
    name: "손익보고서",
    category: "profit-report",
    allowedRoles: [],
    children: [
      {
        path: "/profit-report/cost-management",
        name: "원가관리",
        category: "profit-report",
        allowedRoles: [],
      },
      {
        path: "/profit-report/card-management",
        name: "카드관리",
        category: "profit-report",
        allowedRoles: [],
      },
      {
        path: "/profit-report/account-management",
        name: "계좌관리",
        category: "profit-report",
        allowedRoles: [],
      },
      {
        path: "/profit-report/profit-management",
        name: "손익관리",
        category: "profit-report",
        allowedRoles: [],
      },
      {
        path: "/profit-report/automation",
        name: "자동화",
        category: "profit-report",
        allowedRoles: [],
      },
    ],
  },
  {
    path: "/mypage",
    name: "마이페이지",
    category: "mypage",
    allowedRoles: [],
    children: [
      {
        path: "/mypage/account",
        name: "계정관리",
        category: "mypage",
        allowedRoles: [],
      },
      {
        path: "/mypage/tasks",
        name: "업무관리",
        category: "mypage",
        allowedRoles: [],
      },
      {
        path: "/mypage/contracts",
        name: "계약관리",
        category: "mypage",
        allowedRoles: [],
      },
      {
        path: "/mypage/vacation",
        name: "휴가관리",
        category: "mypage",
        allowedRoles: [],
      },
      {
        path: "/mypage/automation",
        name: "자동화",
        category: "mypage",
        allowedRoles: [],
      },
    ],
  },
  {
    path: "/admin",
    name: "관리자",
    category: "admin",
    allowedRoles: [],
    children: [
      {
        path: "/admin/system",
        name: "기초등록",
        category: "admin",
        allowedRoles: [],
      },
      {
        path: "/admin/users",
        name: "사용자관리",
        category: "admin",
        allowedRoles: [],
      },
      {
        path: "/admin/pages",
        name: "페이지설정",
        category: "admin",
        allowedRoles: [],
      },
      {
        path: "/admin/logs",
        name: "로그관리",
        category: "admin",
        allowedRoles: [],
      },
      {
        path: "/admin/servers",
        name: "서버관리",
        category: "admin",
        allowedRoles: [],
      },
    ],
  },
];

export default function AdminSystemPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pagePermissions, setPagePermissions] =
    useState<PagePermission[]>(defaultPages);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  console.log("AdminSystemPage rendered");

  // localStorage에서 데이터 불러오기
  useEffect(() => {
    const savedRoles = localStorage.getItem("88erp_roles");
    const savedDepartments = localStorage.getItem("88erp_departments");
    const savedMembers = localStorage.getItem("88erp_team_members");
    const savedPermissions = localStorage.getItem("88erp_page_permissions");

    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    } else {
      // 기본 역할 설정
      setRoles([
        {
          id: "1",
          name: "관리자",
          permissions: ["all"],
          description: "모든 권한",
        },
        {
          id: "2",
          name: "매니저",
          permissions: ["read", "modify", "delete"],
          description: "읽기, 수정, 삭제",
        },
        {
          id: "3",
          name: "직원",
          permissions: ["read", "modify"],
          description: "읽기, 수정",
        },
        { id: "4", name: "인턴", permissions: ["read"], description: "읽기만" },
      ]);
    }

    if (savedDepartments) {
      setDepartments(JSON.parse(savedDepartments));
    } else {
      // 기본 부서 설정 - 실제 조직도 기반
      setDepartments([
        // 대표 직속
        { id: "1", name: "미래전략부", type: "department" },
        { id: "2", name: "미래사업팀", type: "team", parentId: "1" },
        { id: "3", name: "행복인사팀", type: "team", parentId: "1" },
        { id: "4", name: "경영지원팀", type: "team", parentId: "1" },

        // 브랜드사업부 (ANN - Brand Director)
        {
          id: "5",
          name: "브랜드사업부",
          type: "department",
          managerId: "ann",
          managerName: "ANN",
          managerRole: "Brand Director",
        },
        { id: "6", name: "오프라인팀", type: "team", parentId: "5" },
        { id: "7", name: "온라인팀", type: "team", parentId: "5" },
        { id: "8", name: "디자인팀", type: "team", parentId: "5" },

        // 토이사업부
        { id: "9", name: "토이사업부", type: "department" },
        { id: "10", name: "토이개발실", type: "team", parentId: "9" },
        { id: "11", name: "토이제품팀", type: "team", parentId: "9" },

        // 생산물류부
        { id: "12", name: "생산물류부", type: "department" },
        {
          id: "13",
          name: "생산물류팀",
          type: "team",
          parentId: "12",
          managerId: "unja",
          managerName: "UNJA",
          managerRole: "Filling Technician",
        },
        { id: "14", name: "창동본사", type: "team", parentId: "13" },
        { id: "15", name: "양주지점", type: "team", parentId: "13" },
      ]);
    }

    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    } else {
      // 기본 팀 멤버 설정 - 조직도 기반
      setTeamMembers([
        // Management & R&D
        {
          id: "1",
          name: "ANN",
          englishName: "ANN",
          role: "CEO",
          department: "대표",
          type: "manager",
        },
        {
          id: "2",
          name: "ANN",
          englishName: "ANN",
          role: "Brand Director",
          department: "브랜드사업부",
          type: "manager",
        },
        {
          id: "3",
          name: "YOZI",
          englishName: "YOZI",
          role: "Brand Designer",
          department: "브랜드사업부",
          type: "rd",
        },
        {
          id: "4",
          name: "SULHEE",
          englishName: "SULHEE",
          role: "Sewing Technician",
          department: "생산물류부",
          type: "rd",
        },
        {
          id: "5",
          name: "MOCHA",
          englishName: "MOCHA",
          role: "Pattern Designer",
          department: "브랜드사업부",
          type: "rd",
        },

        // Sales Team
        {
          id: "6",
          name: "MIN",
          englishName: "MIN",
          role: "E-commerce MD",
          department: "브랜드사업부",
          team: "온라인팀",
          type: "sales",
        },
        {
          id: "7",
          name: "NABOM",
          englishName: "NABOM",
          role: "Contents Marketer",
          department: "브랜드사업부",
          team: "온라인팀",
          type: "sales",
        },
        {
          id: "8",
          name: "HARU",
          englishName: "HARU",
          role: "Product Manager",
          department: "브랜드사업부",
          type: "sales",
        },
        {
          id: "9",
          name: "ARI",
          englishName: "ARI",
          role: "Product Manager",
          department: "브랜드사업부",
          type: "sales",
        },
        {
          id: "10",
          name: "JUDY",
          englishName: "JUDY",
          role: "Product Manager",
          department: "브랜드사업부",
          type: "sales",
        },
        {
          id: "11",
          name: "NIA",
          englishName: "NIA",
          role: "Product Manager",
          department: "브랜드사업부",
          type: "sales",
        },

        // Maker Team
        {
          id: "12",
          name: "UNJA",
          englishName: "UNJA",
          role: "Filling Technician",
          department: "생산물류부",
          team: "생산물류팀",
          type: "maker",
        },
        {
          id: "13",
          name: "YOUNGGIL",
          englishName: "YOUNGGIL",
          role: "Logistics Manager",
          department: "생산물류부",
          team: "생산물류팀",
          type: "maker",
        },
      ]);
    }

    if (savedPermissions) {
      try {
        setPagePermissions(JSON.parse(savedPermissions));
      } catch (error) {
        console.error("Error parsing page permissions:", error);
        setPagePermissions(defaultPages);
      }
    } else {
      // 기본값 설정 - 관리자는 모든 페이지 접근 가능
      const adminDefaultPages = defaultPages.map((category) => ({
        ...category,
        allowedRoles: ["1"], // 관리자 역할 ID
        children: category.children?.map((page) => ({
          ...page,
          allowedRoles: ["1"],
        })),
      }));
      setPagePermissions(adminDefaultPages);
    }
  }, []);

  // 데이터 저장 함수
  const saveToLocalStorage = () => {
    localStorage.setItem("88erp_roles", JSON.stringify(roles));
    localStorage.setItem("88erp_departments", JSON.stringify(departments));
    localStorage.setItem("88erp_team_members", JSON.stringify(teamMembers));
    localStorage.setItem(
      "88erp_page_permissions",
      JSON.stringify(pagePermissions),
    );

    window.dispatchEvent(
      new CustomEvent("systemSettingsUpdated", {
        detail: { roles, departments, members: teamMembers },
      }),
    );

    window.dispatchEvent(
      new CustomEvent("pagePermissionsUpdated", {
        detail: { permissions: pagePermissions },
      }),
    );

    alert("설정이 저장되었습니다.");
  };

  // 편집 상태
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editingDept, setEditingDept] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<{
    name: string;
    permissions: string[];
    description: string;
  } | null>(null);
  const [newDept, setNewDept] = useState<{
    name: string;
    type: "department" | "team";
    parentId: string;
  } | null>(null);
  const [editRoleData, setEditRoleData] = useState<Role | null>(null);
  const [editDeptData, setEditDeptData] = useState<Department | null>(null);

  // 역할 추가
  const addRole = () => {
    if (newRole && newRole.name) {
      const updatedRoles = [
        ...roles,
        {
          id: Date.now().toString(),
          ...newRole,
          permissions: newRole.permissions || [],
        },
      ];
      setRoles(updatedRoles);
      localStorage.setItem("88erp_roles", JSON.stringify(updatedRoles));
      
      // 사용자 관리 페이지에 업데이트 알림
      window.dispatchEvent(new CustomEvent('systemSettingsUpdated', {
        detail: { roles: updatedRoles }
      }));
      setNewRole(null);
    }
  };

  // 역할 수정
  const startEditRole = (role: Role) => {
    setEditingRole(role.id);
    setEditRoleData({ ...role });
  };

  const saveEditRole = () => {
    if (editRoleData && editingRole) {
      const updatedRoles = roles.map((r) =>
        r.id === editingRole ? editRoleData : r,
      );
      setRoles(updatedRoles);
      localStorage.setItem("88erp_roles", JSON.stringify(updatedRoles));
      
      // 사용자 관리 페이지에 업데이트 알림
      window.dispatchEvent(new CustomEvent('systemSettingsUpdated', {
        detail: { roles: updatedRoles }
      }));
      setEditingRole(null);
      setEditRoleData(null);
    }
  };

  // 역할 삭제
  const deleteRole = (id: string) => {
    if (confirm("이 역할을 삭제하시겠습니까?")) {
      const updatedRoles = roles.filter((role) => role.id !== id);
      setRoles(updatedRoles);
      localStorage.setItem("88erp_roles", JSON.stringify(updatedRoles));
      
      // 사용자 관리 페이지에 업데이트 알림
      window.dispatchEvent(new CustomEvent('systemSettingsUpdated', {
        detail: { roles: updatedRoles }
      }));
    }
  };

  // 역할 순서 변경
  const moveRole = (index: number, direction: "up" | "down") => {
    const newRoles = [...roles];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newRoles.length) {
      [newRoles[index], newRoles[targetIndex]] = [
        newRoles[targetIndex],
        newRoles[index],
      ];
      setRoles(newRoles);
      localStorage.setItem("88erp_roles", JSON.stringify(newRoles));
    }
  };

  // 부서 추가
  const addDepartment = () => {
    if (newDept && newDept.name) {
      const updatedDepartments = [
        ...departments,
        {
          id: Date.now().toString(),
          name: newDept.name,
          type: newDept.type,
          parentId: newDept.parentId || undefined,
        },
      ];
      setDepartments(updatedDepartments);
      localStorage.setItem(
        "88erp_departments",
        JSON.stringify(updatedDepartments),
      );
      
      // 사용자 관리 페이지에 업데이트 알림
      window.dispatchEvent(new CustomEvent('systemSettingsUpdated', {
        detail: { departments: updatedDepartments }
      }));
      
      setNewDept(null);
    }
  };

  // 부서 수정
  const startEditDept = (dept: Department) => {
    setEditingDept(dept.id);
    setEditDeptData({ ...dept });
  };

  const saveEditDept = () => {
    if (editDeptData && editingDept) {
      const updatedDepartments = departments.map((d) =>
        d.id === editingDept ? editDeptData : d,
      );
      setDepartments(updatedDepartments);
      localStorage.setItem(
        "88erp_departments",
        JSON.stringify(updatedDepartments),
      );
      setEditingDept(null);
      setEditDeptData(null);
    }
  };

  // 부서 삭제
  const deleteDepartment = (id: string) => {
    if (confirm("이 부서를 삭제하시겠습니까?")) {
      const updatedDepartments = departments.filter(
        (dept) => dept.id !== id && dept.parentId !== id,
      );
      setDepartments(updatedDepartments);
      localStorage.setItem(
        "88erp_departments",
        JSON.stringify(updatedDepartments),
      );
    }
  };

  // 카테고리 토글
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  // 권한 토글
  const togglePermission = (
    path: string,
    roleId: string,
    isCategory: boolean = false,
  ) => {
    setPagePermissions((prev) => {
      const updated = [...prev];

      const updatePage = (pages: PagePermission[]): PagePermission[] => {
        return pages.map((page) => {
          if (page.path === path) {
            const newAllowedRoles = page.allowedRoles.includes(roleId)
              ? page.allowedRoles.filter((r) => r !== roleId)
              : [...page.allowedRoles, roleId];

            // 카테고리인 경우 하위 페이지도 업데이트
            if (isCategory && page.children) {
              return {
                ...page,
                allowedRoles: newAllowedRoles,
                children: page.children.map((child) => ({
                  ...child,
                  allowedRoles: newAllowedRoles,
                })),
              };
            }

            return { ...page, allowedRoles: newAllowedRoles };
          }

          if (page.children) {
            return { ...page, children: updatePage(page.children) };
          }

          return page;
        });
      };

      const result = updatePage(updated);

      // 자동 저장
      localStorage.setItem("88erp_page_permissions", JSON.stringify(result));

      return result;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">기초등록</h1>
          <p className="text-gray-600 mt-1">역할과 부서를 관리합니다</p>
        </div>
        <button
          onClick={saveToLocalStorage}
          className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          전체 저장
        </button>
      </div>

      {/* 부서/팀 관리 - 조직도 형식 */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              부서/팀 관리
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setNewDept({ name: "", type: "department", parentId: "" })
                }
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />
                부서 추가
              </button>
              <button
                onClick={() =>
                  setNewDept({ name: "", type: "team", parentId: "" })
                }
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />팀 추가
              </button>
            </div>
          </div>

          {/* 부서/팀 추가 폼 */}
          {newDept && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={
                    newDept.type === "department" ? "부서명" : "팀명"
                  }
                  value={newDept.name}
                  onChange={(e) =>
                    setNewDept({ ...newDept, name: e.target.value })
                  }
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {newDept.type === "team" && (
                  <select
                    value={newDept.parentId}
                    onChange={(e) =>
                      setNewDept({ ...newDept, parentId: e.target.value })
                    }
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">소속 부서 선택</option>
                    {departments
                      .filter((d) => d.type === "department")
                      .map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                  </select>
                )}
                <button
                  onClick={addDepartment}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                  disabled={newDept.type === "team" && !newDept.parentId}
                >
                  <Check className="h-4 w-4 mr-1" />
                  저장
                </button>
                <button
                  onClick={() => setNewDept(null)}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <X className="h-4 w-4 mr-1" />
                  취소
                </button>
              </div>
            </div>
          )}

          {/* 조직도 형식 - 최대 6열 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {departments
              .filter((d) => d.type === "department")
              .map((dept) => {
                const teams = departments.filter(
                  (t) => t.type === "team" && t.parentId === dept.id,
                );

                return (
                  <div key={dept.id} className="flex flex-col items-center">
                    {/* 부서 박스 */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 w-full max-w-[200px] text-center relative group">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        {editingDept === dept.id && editDeptData ? (
                          <input
                            type="text"
                            value={editDeptData.name}
                            onChange={(e) =>
                              setEditDeptData({
                                ...editDeptData,
                                name: e.target.value,
                              })
                            }
                            className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-24 text-center"
                          />
                        ) : (
                          <h4 className="font-semibold text-sm">{dept.name}</h4>
                        )}
                      </div>
                      <div className="absolute top-1 right-1 flex gap-0.5">
                        {editingDept === dept.id && editDeptData ? (
                          <>
                            <button
                              onClick={saveEditDept}
                              className="p-0.5 text-green-600 hover:bg-green-50 rounded"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingDept(null);
                                setEditDeptData(null);
                              }}
                              className="p-0.5 text-gray-600 hover:bg-gray-100 rounded"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditDept(dept)}
                              className="p-0.5 text-gray-600 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => deleteDepartment(dept.id)}
                              className="p-0.5 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 연결선 */}
                    {teams.length > 0 && (
                      <>
                        <div className="w-0.5 h-6 bg-gray-300"></div>

                        {/* 팀 박스들 */}
                        <div className="flex flex-col gap-2 w-full">
                          {teams.map((team, index) => (
                            <div
                              key={team.id}
                              className="flex flex-col items-center"
                            >
                              {index > 0 && (
                                <div className="w-0.5 h-2 bg-gray-300"></div>
                              )}
                              <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 w-full max-w-[180px] text-center relative group">
                                <div className="flex items-center justify-center gap-2">
                                  <Users className="w-3 h-3 text-gray-600" />
                                  {editingDept === team.id && editDeptData ? (
                                    <input
                                      type="text"
                                      value={editDeptData.name}
                                      onChange={(e) =>
                                        setEditDeptData({
                                          ...editDeptData,
                                          name: e.target.value,
                                        })
                                      }
                                      className="px-1 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-20 text-center"
                                    />
                                  ) : (
                                    <span className="text-xs font-medium">
                                      {team.name}
                                    </span>
                                  )}
                                </div>
                                <div className="absolute top-0.5 right-0.5 flex gap-0.5">
                                  {editingDept === team.id && editDeptData ? (
                                    <>
                                      <button
                                        onClick={saveEditDept}
                                        className="p-0.5 text-green-600 hover:bg-green-50 rounded"
                                      >
                                        <Check className="h-2.5 w-2.5" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          setEditingDept(null);
                                          setEditDeptData(null);
                                        }}
                                        className="p-0.5 text-gray-600 hover:bg-gray-100 rounded"
                                      >
                                        <X className="h-2.5 w-2.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => startEditDept(team)}
                                        className="p-0.5 text-gray-600 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Edit2 className="h-2.5 w-2.5" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          deleteDepartment(team.id)
                                        }
                                        className="p-0.5 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 className="h-2.5 w-2.5" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* 역할 관리와 페이지 권한 - 2열 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 역할 관리 */}
        <div className="card">
          <div className="card-body">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                권한그룹 관리
              </h3>
              <button
                onClick={() =>
                  setNewRole({ name: "", permissions: [], description: "" })
                }
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-1" />새 권한그룹
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="w-12 px-2 py-2"></th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      권한그룹명
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      읽기
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      수정
                    </th>
                    <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      삭제
                    </th>
                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newRole !== null && (
                    <tr className="bg-blue-50">
                      <td></td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          placeholder="권한그룹명"
                          value={newRole.name}
                          onChange={(e) =>
                            setNewRole({ ...newRole, name: e.target.value })
                          }
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={newRole.permissions.includes("read")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRole({
                                ...newRole,
                                permissions: [...newRole.permissions, "read"],
                              });
                            } else {
                              setNewRole({
                                ...newRole,
                                permissions: newRole.permissions.filter(
                                  (p) => p !== "read",
                                ),
                              });
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={newRole.permissions.includes("modify")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRole({
                                ...newRole,
                                permissions: [...newRole.permissions, "modify"],
                              });
                            } else {
                              setNewRole({
                                ...newRole,
                                permissions: newRole.permissions.filter(
                                  (p) => p !== "modify",
                                ),
                              });
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={newRole.permissions.includes("delete")}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRole({
                                ...newRole,
                                permissions: [...newRole.permissions, "delete"],
                              });
                            } else {
                              setNewRole({
                                ...newRole,
                                permissions: newRole.permissions.filter(
                                  (p) => p !== "delete",
                                ),
                              });
                            }
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <div className="flex gap-1 justify-end">
                          <button
                            onClick={addRole}
                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setNewRole(null)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}

                  {roles.map((role, index) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-2 py-2">
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => moveRole(index, "up")}
                            disabled={index === 0}
                            className={`p-0.5 rounded transition-colors ${
                              index === 0
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => moveRole(index, "down")}
                            disabled={index === roles.length - 1}
                            className={`p-0.5 rounded transition-colors ${
                              index === roles.length - 1
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                      {editingRole === role.id && editRoleData ? (
                        <>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              value={editRoleData.name}
                              onChange={(e) =>
                                setEditRoleData({
                                  ...editRoleData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={editRoleData.permissions.includes(
                                "read",
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditRoleData({
                                    ...editRoleData,
                                    permissions: [
                                      ...editRoleData.permissions,
                                      "read",
                                    ],
                                  });
                                } else {
                                  setEditRoleData({
                                    ...editRoleData,
                                    permissions:
                                      editRoleData.permissions.filter(
                                        (p) => p !== "read",
                                      ),
                                  });
                                }
                              }}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={editRoleData.permissions.includes(
                                "modify",
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditRoleData({
                                    ...editRoleData,
                                    permissions: [
                                      ...editRoleData.permissions,
                                      "modify",
                                    ],
                                  });
                                } else {
                                  setEditRoleData({
                                    ...editRoleData,
                                    permissions:
                                      editRoleData.permissions.filter(
                                        (p) => p !== "modify",
                                      ),
                                  });
                                }
                              }}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={editRoleData.permissions.includes(
                                "delete",
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditRoleData({
                                    ...editRoleData,
                                    permissions: [
                                      ...editRoleData.permissions,
                                      "delete",
                                    ],
                                  });
                                } else {
                                  setEditRoleData({
                                    ...editRoleData,
                                    permissions:
                                      editRoleData.permissions.filter(
                                        (p) => p !== "delete",
                                      ),
                                  });
                                }
                              }}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-3 py-2 text-right">
                            <div className="flex gap-1 justify-end">
                              <button
                                onClick={saveEditRole}
                                className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingRole(null);
                                  setEditRoleData(null);
                                }}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 py-2">
                            <h4 className="font-medium text-sm text-gray-900">
                              {role.name}
                            </h4>
                          </td>
                          <td className="px-3 py-2 text-center">
                            {role.permissions?.read ? (
                              <Check className="h-4 w-4 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {role.permissions?.modify ? (
                              <Check className="h-4 w-4 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {role.permissions?.delete ? (
                              <Check className="h-4 w-4 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-4 w-4 text-gray-300 mx-auto" />
                            )}
                          </td>
                          <td className="px-3 py-2 text-right">
                            <div className="flex gap-1 justify-end">
                              <button
                                onClick={() => startEditRole(role)}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Edit2 className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => deleteRole(role.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 페이지 권한 관리 */}
        <div className="card">
          <div className="card-body">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                페이지 권한
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      페이지
                    </th>
                    {roles.map((role) => (
                      <th
                        key={role.id}
                        className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]"
                      >
                        {role.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles.length === 0 ? (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        역할을 먼저 등록해주세요.
                      </td>
                    </tr>
                  ) : (
                    pagePermissions.map((category) => (
                      <React.Fragment key={category.path}>
                        {/* 카테고리 행 */}
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleCategory(category.category)}
                              className="flex items-center gap-2 font-medium text-gray-900"
                            >
                              {expandedCategories.includes(
                                category.category,
                              ) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                              {category.name}
                            </button>
                          </td>
                          {roles.map((role) => (
                            <td key={role.id} className="px-4 py-3 text-center">
                              <button
                                onClick={() =>
                                  togglePermission(category.path, role.id, true)
                                }
                                className="p-1"
                              >
                                {category.allowedRoles.includes(role.id) ? (
                                  <Eye className="w-5 h-5 text-green-600" />
                                ) : (
                                  <EyeOff className="w-5 h-5 text-gray-300" />
                                )}
                              </button>
                            </td>
                          ))}
                        </tr>

                        {/* 하위 페이지들 */}
                        {expandedCategories.includes(category.category) &&
                          category.children?.map((page) => (
                            <tr key={page.path} className="hover:bg-gray-50">
                              <td className="px-4 py-3 pl-12">
                                <span className="text-sm text-gray-700">
                                  {page.name}
                                </span>
                              </td>
                              {roles.map((role) => (
                                <td
                                  key={role.id}
                                  className="px-4 py-3 text-center"
                                >
                                  <button
                                    onClick={() =>
                                      togglePermission(page.path, role.id)
                                    }
                                    className="p-1"
                                  >
                                    {page.allowedRoles.includes(role.id) ? (
                                      <Eye className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <EyeOff className="w-4 h-4 text-gray-300" />
                                    )}
                                  </button>
                                </td>
                              ))}
                            </tr>
                          ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
