"use client";

import { useEffect } from "react";

export default function AdminAsciiLog() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(`
███╗   ███╗███████╗██████╗ ██╗ █████╗ ██╗  ██╗
████╗ ████║██╔════╝██╔══██╗██║██╔══██╗╚██╗██╔╝
██╔████╔██║█████╗  ██║  ██║██║███████║ ╚███╔╝ 
██║╚██╔╝██║██╔══╝  ██║  ██║██║██╔══██║ ██╔██╗ 
██║ ╚═╝ ██║███████╗██████╔╝██║██║  ██║██╔╝ ██╗
╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
ADMIN
`);
  }, []);

  return null;
}
