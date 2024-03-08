import networkx as nx
import matplotlib.pyplot as plt

#https://community.topcoder.com/stat?c=problem_statement&pm=6721

class FriendsTrouble:

    def divide(names, friends):
        
        if len(names) < 1 or len(names) > 50:
            raise ValueError("Names will contain between 1 and 50 elements")
        
        for name in names:
            if (len(name) < 1 or len (name) > 20) or not name.isalpha() or not name.isupper():
                raise ValueError("Each element in names should contain between 1 and 20 uppercase letters.")
            
        if len(set(names)) != len(names):
            raise ValueError("All elements in names will be distinct.")
        
        if len(friends) < 0 or len(friends) > 50:
            raise ValueError("Friends will contain between 0 and 50 elements")
        
        for friend_pair in friends:
            pair_names = friend_pair.split()
            if len(pair_names) != 2 or pair_names[0] not in names or pair_names[1] not in names:
                raise ValueError("Each element in friends should be formatted as '<name1> <name2>' where both names are elements of names.")
        
        graph = {}

        for name in names:
            graph[name] = []

        for pair in friends:
            friend1, friend2 = pair.split()
            
            if friend2 not in graph[friend1]:
                graph[friend1].append(friend2)
            if friend1 not in graph[friend2]:
                graph[friend2].append(friend1)
                
            
        def dfs(node, graph, visited, component):
            visited[node] = True
            component.append(node)

            for neighbor in graph.get(node, []):
                if neighbor not in visited or not visited[neighbor]:
                    dfs(neighbor, graph, visited, component)

        
        visited, components = {}, []
        visited = {node: False for node in graph}
            
        for node in graph:
            if not visited[node]:
                component = []
                dfs(node, graph, visited, component)
                components.append(component)
            
        return components, len(components), graph

     
def main():
    names = ['BOB', 'HARRY', 'ALICE', 'SALLY']
    friends = ['BOB ALICE', 'HARRY SALLY']

    groups1, num_groups1, graph1 = FriendsTrouble.divide(names, friends)
    for group in groups1:
        print(group)
    print(f'\033[1mBroj grupa: {num_groups1}\033[0m \n')
    
    '''g = nx.Graph(graph1)
    pos = nx.spring_layout(g) 
    nx.draw(g, pos, with_labels=True, font_weight='bold')
    plt.show()
    '''
    names2 = ['BOB', 'HARRY', 'ALICE', 'SALLY']
    friends2 = ['BOB HARRY', 'HARRY ALICE', 'ALICE SALLY']
    
    groups2, num_groups2, graph2 = FriendsTrouble.divide(names2, friends2)
    for group in groups2:
        print(group)
    print(f'\033[1mBroj grupa: {num_groups2}\033[0m \n')
    
    names3 = ['CHUCK']
    friends3 = ['CHUCK CHUCK','CHUCK CHUCK', 'CHUCK CHUCK']
    groups3, num_groups3, graph3 = FriendsTrouble.divide(names3, friends3)
    for group in groups3:
        print(group)
    print(f'\033[1mBroj grupa: {num_groups3}\033[0m \n')
    

    names4 = ['PETRA', 'MAJA', 'IVAN', 'MARKO', 'IVA', 'LUCIJA']
    friends4 = ['PETRA IVAN', 'MAJA IVAN', 'IVA MARKO']
    groups4, num_groups4, graph4 = FriendsTrouble.divide(names4, friends4)
    for group in groups4:
        print(group)
    print(f'\033[1mBroj grupa: {num_groups4}\033[0m \n')
    
    
if __name__ == '__main__':
    main()
