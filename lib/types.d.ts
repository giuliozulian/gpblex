type NavProps = {
  className?: string;
  children?: React.ReactNode;
  id?: string;
};

interface MenuItem {
  id: string;
  label: string;
  path: string;
  parentId: string | null;
}
