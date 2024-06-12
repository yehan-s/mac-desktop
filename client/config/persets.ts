interface Position {
  position: string;
}

interface DialogState {
  containerVisible: boolean;
  maximized: boolean;
}

export default {
  dialog: {
    root: ({ state }: { state: DialogState }) => ({
      class: [
        // top
        "absolute",
        "top-[20vh]",
        // Shape
        "rounded-lg",
        "shadow-xl",
        "border-0",
        // Size
        "max-h-[90vh]",
        { "sm:w-full sm:max-w-lg": !state.maximized },
        "m-0",
        // Transitions
        "transform",
        "scale-100",
        // Color
        // "dark:border",
        "bg-blue-50",
        "dark:border-surface-700",
        // Maximized State
        {
          "transition-none": state.maximized,
          "transform-none": state.maximized,
          "!w-screen": state.maximized,
          "!h-screen": state.maximized,
          "!max-h-full": state.maximized,
          "!top-0": state.maximized,
          "!left-0": state.maximized,
        },
      ],
    }),
    header: {
      class: [
        "flex items-center justify-between",
        "shrink-0",
        "p-6 pt-4",
        "rounded-tl-lg",
        "rounded-tr-lg",
        "bg-surface-0 dark:bg-surface-800",
        "text-surface-700 dark:text-surface-0/80",
      ],
    },
    title: {
      class: ["font-semibold text-base leading-6"],
    },
    icons: {
      class: ["flex items-center"],
    },
    closeButton: {
      class: [
        "relative",
        "flex items-center justify-center",
        "mr-2",
        "last:mr-0",
        "w-6 h-6",
        "border-0",
        "rounded-full",
        "text-surface-500",
        "bg-transparent",
        "transition duration-200 ease-in-out",
        "hover:text-surface-700 dark:hover:text-white/80",
        "hover:bg-surface-100 dark:hover:bg-surface-800/80",
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        "overflow-hidden",
      ],
    },
    maximizablebutton: {
      class: [
        "relative",
        "flex items-center justify-center",
        "mr-2",
        "last:mr-0",
        "w-6 h-6",
        "border-0",
        "rounded-full",
        "text-surface-500",
        "bg-transparent",
        "transition duration-200 ease-in-out",
        "hover:text-surface-700 dark:hover:text-white/80",
        "hover:bg-surface-100 dark:hover:bg-surface-800/80",
        "focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset",
        "focus:ring-primary-500 dark:focus:ring-primary-400",
        "overflow-hidden",
      ],
    },
    closeButtonIcon: {
      class: ["inline-block", "w-3", "h-3"],
    },
    maximizableicon: {
      class: ["inline-block", "w-3", "h-3"],
    },
    content: ({ state, instance }: { state: DialogState; instance: any }) => ({
      class: [
        // Font
        "text-sm",
        // Spacing
        "px-6",
        "pb-3",
        "pt-0",
        // Shape
        {
          grow: state.maximized,
          "rounded-bl-lg": !instance.$slots.footer,
          "rounded-br-lg": !instance.$slots.footer,
        },
        // Colors
        "bg-surface-0 dark:bg-surface-800",
        "text-surface-600 dark:text-surface-0/70",
        // Misc
        "overflow-y-auto",
      ],
    }),
    footer: {
      class: [
        "flex items-center justify-end",
        "shrink-0",
        "text-right",
        "gap-3",
        "px-6",
        "py-3",
        "border-t-0",
        "rounded-b-lg",
        "bg-surface-50 dark:bg-surface-700",
        "text-surface-700 dark:text-surface-0/80",
      ],
    },
    transition: ({ props }: { props: Position }) =>
      props.position === "top"
        ? {
            enterFromClass:
              "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active",
            enterActiveClass: "transition-all duration-200 ease-out",
            leaveActiveClass: "transition-all duration-200 ease-out",
            leaveToClass:
              "opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0 mask-active",
          }
        : props.position === "bottom"
          ? {
              enterFromClass: "opacity-0 scale-75 translate-y-full mask-active",
              enterActiveClass: "transition-all duration-200 ease-out",
              leaveActiveClass: "transition-all duration-200 ease-out",
              leaveToClass:
                "opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0 mask-active",
            }
          : props.position === "left" ||
              props.position === "topleft" ||
              props.position === "bottomleft"
            ? {
                enterFromClass:
                  "opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0 mask-active",
                enterActiveClass: "transition-all duration-200 ease-out",
                leaveActiveClass: "transition-all duration-200 ease-out",
                leaveToClass:
                  "opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0 mask-active",
              }
            : props.position === "right" ||
                props.position === "topright" ||
                props.position === "bottomright"
              ? {
                  enterFromClass:
                    "opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active",
                  enterActiveClass: "transition-all duration-200 ease-out",
                  leaveActiveClass: "transition-all duration-200 ease-out",
                  leaveToClass:
                    "opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0 mask-active",
                }
              : {
                  enterFromClass: "opacity-0 scale-75 mask-active",
                  enterActiveClass: "transition-all duration-200 ease-out",
                  leaveActiveClass: "transition-all duration-200 ease-out",
                  leaveToClass: "opacity-0 scale-75 mask-active",
                },
  },
  dock: {
    // props: DockItem
    root: ({ props }: { props: Position }) => ({
      class: [
        // Positioning
        "absolute z-1",
        {
          "left-0 bottom-4 w-full": props.position == "bottom",
          "left-0 top-0 w-full": props.position == "top",
          "left-0 top-0 h-full": props.position == "left",
          "right-0 top-0 h-full": props.position == "right",
        },
        // Flexbox & Alignment
        "flex justify-center items-center",
        // Interactivity
        "pointer-events-none",
      ],
    }),
    container: {
      class: [
        "flex",
        "rounded-md",
        "bg-surface-0/10 dark:bg-surface-900/20 border border-surface-0/20",
        "backdrop-blur-sm",
        "p-2",
        "pointer-events-auto",
      ],
    },
    menu: ({ props }: { props: Position }) => ({
      class: [
        // Flexbox & Alignment
        "flex items-center justify-center",
        {
          "flex-col": props.position == "left" || props.position == "right",
        },
        // List Style
        "m-0 p-0 list-none",
        // Shape
        "outline-none",
      ],
    }),
    // @ts-ignore
    menuitem: ({ props, context, instance }) => ({
      class: [
        // Spacing & Shape
        "p-2 rounded-md",
        // Conditional Scaling
        {
          "hover:scale-150": instance.currentIndex === context.index,
          "scale-125":
            instance.currentIndex - 1 === context.index ||
            instance.currentIndex + 1 === context.index,
          "scale-110":
            instance.currentIndex - 2 === context.index ||
            instance.currentIndex + 2 === context.index,
        },
        // Positioning & Hover States
        {
          "origin-bottom hover:mx-6": props.position == "bottom",
          "origin-top hover:mx-6": props.position == "top",
          "origin-left hover:my-6": props.position == "left",
          "origin-right hover:my-6": props.position == "right",
        },
        // Transitions & Transform
        "transition-all duration-200 ease-cubic-bezier-will-change-transform transform",
      ],
    }),
    action: {
      class: [
        "flex flex-col items-center justify-center",
        "relative",
        "w-16 h-16",
        "cursor-default overflow-hidden",
      ],
    },
  },
  toast: {
    root: ({
      props,
    }: {
      props: {
        position:
          | "center"
          | "top-left"
          | "top-center"
          | "top-right"
          | "bottom-left"
          | "bottom-center"
          | "bottom-right";
      };
    }) => ({
      class: [
        //Size and Shape
        "w-96 rounded-md",
        // Positioning
        {
          "-translate-x-2/4":
            props.position == "top-center" || props.position == "bottom-center",
        },
      ],
    }),
    container: ({ props }: { props: any }) => ({
      class: [
        "my-4 rounded-md w-full",
        "border-solid border-0 border-l-[6px]",
        "backdrop-blur-[10px] shadow-md",
        // Colors
        {
          "bg-blue-100/70 dark:bg-blue-500/20":
            props.message.severity == "info",
          "bg-green-100/70 dark:bg-green-500/20":
            props.message.severity == "success",
          "bg-orange-100/70 dark:bg-orange-500/20":
            props.message.severity == "warn",
          "bg-red-100/70 dark:bg-red-500/20": props.message.severity == "error",
        },
        {
          "border-blue-500 dark:border-blue-400":
            props.message.severity == "info",
          "border-green-500 dark:border-green-400":
            props.message.severity == "success",
          "border-orange-500 dark:border-orange-400":
            props.message.severity == "warn",
          "border-red-500 dark:border-red-400":
            props.message.severity == "error",
        },
        {
          "text-blue-700 dark:text-blue-300": props.message.severity == "info",
          "text-green-700 dark:text-green-300":
            props.message.severity == "success",
          "text-orange-700 dark:text-orange-300":
            props.message.severity == "warn",
          "text-red-700 dark:text-red-300": props.message.severity == "error",
        },
      ],
    }),
    content: ({ props }: { props: any }) => ({
      class: [
        "flex p-4",
        {
          "items-start": props.message.summary,
          "items-center": !props.message.summary,
        },
      ],
    }),
    icon: {
      class: ["w-6 h-6", "text-lg leading-none mr-2 shrink-0"],
    },
    text: {
      class: ["text-base leading-none", "ml-2", "flex-1"],
    },
    summary: {
      class: "font-bold block",
    },
    detail: ({ props }: { props: any }) => ({
      class: ["block", { "mt-2": props.message.summary }],
    }),
    closebutton: {
      class: [
        "flex items-center justify-center",
        "w-8 h-8",
        "ml-auto  relative",
        "rounded-full",
        "bg-transparent",
        "transition duration-200 ease-in-out",
        "hover:bg-surface-0/50 dark:hover:bg-surface-0/10",
        "overflow-hidden",
      ],
    },
    transition: {
      enterFromClass: "opacity-0 translate-y-2/4",
      enterActiveClass: "transition-[transform,opacity] duration-300",
      leaveFromClass: "max-h-[1000px]",
      leaveActiveClass:
        "!transition-[max-height_.45s_cubic-bezier(0,1,0,1),opacity_.3s,margin-bottom_.3s] overflow-hidden",
      leaveToClass: "max-h-0 opacity-0 mb-0",
    },
  },
};
