Node = (data) => {
  return {
    data,
    left: null,
    right: null,
  };
};

const Tree = (array) => {
  let root = buildTree(array);

  function buildTree(arr, start = 0, end, sorted = false) {
    if (!sorted) {
      arr = [...new Set(array)];
      arr = arr.sort((a, b) => a - b);
      const length = arr.length;
      end = length - 1;
      sorted = true;
    }

    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const rootNode = Node(arr[middle]);

    rootNode.left = buildTree(arr, start, middle - 1, sorted);
    rootNode.right = buildTree(arr, middle + 1, end, sorted);

    return rootNode;
  }
  function insert(value) {
    if (root === null) {
      root = Node(value);
      return;
    }
    let data = root;
    let inserted = false;

    while (!inserted) {
      if (value < data.data) {
        if (data.left === null) {
          data.left = Node(value);
          inserted = true;
        } else {
          data = data.left;
        }
      } else if (value > data.data) {
        if (data.right === null) {
          data.right = Node(value);
          inserted = true;
        } else {
          data = data.right;
        }
      } else {
        inserted = true;
      }
    }
  }
  function minValue(node) {
    let val = node;
    while (val.left !== null) {
      val = node.left;
    }
    return val.data;
  }
  function deleteItem(value) {
    root = deleteRec(root, value);
  }
  function deleteRec(node, value) {
    // Node doesn't exist
    if (node === null) {
      console.log("NOT FOUND");
      return node;
    }

    if (value < node.data) {
      node.left = deleteRec(node.left, value);
    } else if (value > node.data) {
      node.right = deleteRec(node.right, value);
    } else {
      // Node found

      // Node has zero or one child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      // Node has two children
      node.data = minValue(node.right);

      // Delete the inorder value
      node.right = deleteItem(node.right, node.data);
    }
    return node;
  }
  function find(value) {
    return findRec(root, value);
  }
  function findRec(node, value) {
    if (node === null) {
      console.log("NOT FOUND");
      return;
    }

    if (value < node.data) {
      return findRec(node.left, value);
    } else if (value > node.data) {
      return findRec(node.right, value);
    } else {
      return node;
    }
  }
  function levelOrder(callback) {
    if (callback) {
      return levelOrderItr(root).forEach(callback);
    } else {
      return levelOrderItr(root);
    }
    // return levelOrderRec([root]);
  }
  function levelOrderItr(node) {
    const arr = [];
    const queue = [];
    queue.push(node);
    while (queue.length !== 0) {
      const tempNode = queue.shift();
      arr.push(tempNode.data);

      if (tempNode.left !== null) {
        queue.push(tempNode.left);
      }
      if (tempNode.right !== null) {
        queue.push(tempNode.right);
      }
    }
    return arr;
  }
  function levelOrderRec(queue) {
    if (queue.length === 0) {
      return [];
    }
    const tempNode = queue.shift();
    const arr = [];
    arr.push(tempNode.data);

    if (tempNode.left !== null) {
      queue.push(tempNode.left);
    }
    if (tempNode.right !== null) {
      queue.push(tempNode.right);
    }

    return arr.concat(levelOrderRec(queue));
  }
  function inOrder(callback) {
    if (callback) {
      return inOrderRec(root).forEach(callback);
    } else {
      return inOrderRec(root);
    }
  }
  function inOrderRec(node) {
    if (node === null) return [];

    const arr = [];

    // inOrderRec(node.left);
    arr.push(...inOrderRec(node.left));
    arr.push(node.data);
    arr.push(...inOrderRec(node.right));

    return arr;
  }
  function preOrder(callback) {
    if (callback) {
      return preOrderRec(root).forEach(callback);
    } else {
      return preOrderRec(root);
    }
  }
  function preOrderRec(node) {
    if (node == null) return [];
    const arr = [];

    arr.push(node.data);
    arr.push(...preOrderRec(node.left));
    arr.push(...preOrderRec(node.right));

    return arr;
  }
  function postOrder(callback) {
    if (callback) {
      return postOrderRec(root).forEach(callback);
    } else {
      return postOrderRec(root);
    }
  }
  function postOrderRec(node) {
    if (node == null) return [];
    const arr = [];

    arr.push(...postOrderRec(node.left));
    arr.push(...postOrderRec(node.right));
    arr.push(node.data);

    return arr;
  }
  function height(node) {
    if (!node) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }
  function depth(value, node = root, currentDepth = 0) {
    if (!node) return null; // Base case: node is null

    if (node.data === value) return currentDepth; // Found the node with the value

    // Search in the left and right subtrees
    let leftDepth = depth(value, node.left, currentDepth + 1);
    let rightDepth = depth(value, node.right, currentDepth + 1);

    // Return the depth if found in either subtree
    if (leftDepth !== null) return leftDepth;
    if (rightDepth !== null) return rightDepth;

    // If not found in either subtree, return null
    return null;
  }
  function isBalanced() {}
  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
  };
};

const tree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

tree.insert(100);
tree.insert(2);
prettyPrint(tree.root);
console.log(tree.depth(9));
